var fmt = require('demo/vendor/fmt');
var rocambole = require('demo/vendor/rocambole');

var Sandbox = React.createClass({
  getInitialState: function() {
    return {
      location: 'Santa Monica, CA 90404',
      destination: 'Kansas City, MO 64155'
    };
  },
  // componentWillUpdate: function() {
  //   console.log('component will update!');
  // },
  componentWillUpdate: function(nextProps, nextState) {

  },
  // componentWillReceiveProps: function() {
  //   console.log('component will receive props!');
  // },
  handlePresets: function(presets) {
    var newLine = '\n';
    var code = ['taxjar.taxForOrder('];
    var propCount;
    var presetCount = 1;
    var trailing;
    
    var data = {};
    
    _.each(presets, function(preset, presetKey) {
      if (presetKey === 'line_items') {
        preset = { 'line_items': preset };
      }
      if (!_.isObject(preset)) {
        preset = _.pick(presets, presetKey);
      }
      _.merge(data, preset);
    });
    
    data = _.omit(data, function(prop, key) { return (_.startsWith(key, '_')); });
    
    _.each(data, function(prop, key) {
      if (_.isObject(prop) || _.isArray(prop)) {
        _.each(prop, function(subprop, subkey) {
          data[key][subkey] = _.omit(subprop, function(p, k) { return (_.startsWith(k, '_')); });
        });
      }
    });

    code += JSON.stringify(data, null, 2);
    code += ');';

    this.setState({ presetCode: code });
  },
  handleRequest: function(code) {
    this.setState({ code: code });
  },
  send: function() {
    var editor = document.querySelector('.CodeMirror').CodeMirror;
    var ast = rocambole.parse(this.state.code);
    var method = '';
    var methodArgs = [];
    var methodParams = {};
    var allowedMethods = ['categories', 'ratesForLocation', 'taxForOrder', 'listOrders', 'showOrder', 'createOrder', 'updateOrder', 'deleteOrder', 'listRefunds', 'showRefund', 'createRefund', 'updateRefund', 'deleteRefund'];
    
    rocambole.moonwalk(ast, function(node) {
      if (node.type === 'Identifier' && _.includes(allowedMethods, node.name)) {
        method = node.name;
      }
      if (node.type === 'Literal' && node.parent.startToken.value === 'taxjar') {
        methodArgs.push(node.value);
      }
      if (node.type === 'ObjectExpression' && node.parent.type === 'CallExpression') {
        var object = node.toString()
          .replace(/([\$\w]+)\s*:/g, function(_, $1) { return '"'+$1+'":'; })
          .replace(/'([^']+)'/g, function(_, $1) { return '"' + $1 + '"'; });
        methodParams = JSON.parse(object);
      }
    });
    
    if (apiData.tasks[method]) {
      var self = this;
      var request = apiData.tasks[method];

      reqwest({
        url: request.url,
        type: 'json',
        method: request.method,
        contentType: 'application/json',
        data: JSON.stringify(methodParams),
        headers: {
          'Authorization': 'Bearer ' + window.apiToken
        },
        error: function(err) {
          console.error(err.responseText);
        },
        success: function(res) {
          res = _.result(res, Object.keys(res)[0]);
          responseText = JSON.stringify(res, null, 2);
          self.setState({ presetResponse: responseText });
        }
      });  
    }

    // Update map markers
    if (method === 'taxForOrder') {
      var fromAddress = [];
      var toAddress = [];

      _.each(methodParams, function(param, key) {
        if (key.indexOf('from_') !== -1) fromAddress.push(param);
        if (key.indexOf('to_') !== -1) toAddress.push(param);
      });

      this.setState({
        location: fromAddress.join(' '),
        destination: toAddress.join(' ')
      });
    }
  },
  render: function() {
    return (
      <div className="sandbox">
        <div className="sidebar">
          <Presets onChange={this.handlePresets} />
        </div>
        <div className="editor">
          <Preview type="map" location={this.state.location} destination={this.state.destination} />
          <button onClick={this.send}>Send Response</button>
          <div className="split-pane">
            <Request prefill={this.state.presetCode} onChange={this.handleRequest} />
            <Response prefill={this.state.presetResponse} />
          </div>
        </div>
      </div>
    );
  }
});