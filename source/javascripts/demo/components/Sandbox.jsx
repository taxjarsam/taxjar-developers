var fmt = require('demo/fmt');
var rocambole = require('demo/rocambole');

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
      _.merge(data, preset);
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
    
    console.log({
      'method': method,
      'methodArgs': methodArgs,
      'methodParams': methodParams
    });

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
            <Response />
          </div>
        </div>
      </div>
    );
  }
});