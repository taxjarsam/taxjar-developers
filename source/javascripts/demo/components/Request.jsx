var rocambole = require('demo/vendor/rocambole');
var fmt = require('demo/vendor/fmt');

var Request = React.createClass({
  getInitialState: function() {
    return {
      code: "// Request",
      runStatus: 'Run'
    };
  },
  componentDidUpdate: function() {

  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.prefill !== this.state.prefill && nextProps.prefill != this.state.value) {
      this.setState({ prefill: nextProps.prefill, code: nextProps.prefill });
      _.defer(this.lockCode);
    }
  },
  updateCode: function(newCode) {
    this.setState({ code: newCode });
    this.props.onChange({ code: newCode });
  },
  lockCode: function() {
    var editor = document.querySelector('.CodeMirror').CodeMirror;
    var code = esprima.parse(this.state.code, { loc: true, tokens: true });
    
    _.each(code.tokens, function(token) {
      var startPos = { line: token.loc.start.line - 1, ch: token.loc.start.column };
      var endPos = { line: token.loc.end.line - 1, ch: token.loc.end.column };
      var editableTypes = ['String', 'Numeric'];
      
      if (_.includes(editableTypes, token.type)) {
        editor.doc.markText(startPos, endPos, {
          className: 'editable'
        });
      } else {
        editor.doc.markText(startPos, endPos, {
          atomic: true,
          className: 'locked',
          readOnly: true,
          handleMouseEvents: true
        });
      }
    });
  },
  runCode: function() {
    var editor = this.refs.editor;
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
      var args = {};
      var params = (request.method === 'POST') ? JSON.stringify(methodParams) : methodParams;

      _.each(apiData.tasks[method].args, function(argKey, i) {
        args[argKey] = methodArgs[i];
      });
      
      if (args) _.merge(params, args);

      this.props.onChange({ loadingResponse: true });
      
      this.setState({ runStatus: 'Running' });

      reqwest({
        url: request.url,
        type: 'json',
        method: request.method,
        contentType: 'application/json',
        data: params,
        headers: {
          'Authorization': 'Bearer ' + window.apiToken
        },
        error: function(err) {
          err = JSON.parse(err.responseText);
          self.props.onChange({ errorResponse: err.detail, loadingResponse: false });
          self.setState({ runStatus: 'Error' });
          _.delay(function() { self.setState({ runStatus: 'Run' }); }, 3000);
        },
        success: function(res) {
          res = _.result(res, Object.keys(res)[0]);
          responseText = JSON.stringify(res, null, 2);
          self.setState({ runStatus: 'Done' });
          _.delay(function() { self.setState({ runStatus: 'Run' }); }, 1000);
          self.props.onChange({ presetResponse: responseText, errorResponse: null, loadingResponse: false });
          self.updateMarkers(method, methodParams, res);
        }
      });  
    }
  },
  updateMarkers: function(method, methodParams, response) {
    if (method === 'taxForOrder') {
      var fromAddress = [];
      var toAddress = [];

      _.each(methodParams, function(param, key) {
        if (key.indexOf('from_') !== -1) fromAddress.push(param);
        if (key.indexOf('to_') !== -1) toAddress.push(param);
      });

      this.props.onChange({
        location: fromAddress.join(' '),
        destination: toAddress.join(' '),
        metadata: {
          location: {
            tooltip: fmt('<div><h6>Origin</h6><p><i class="fa fa-map-marker from_address"></i>&nbsp; %s<br/>%s, %s %s</p><p class="context">%s</p></div>', fromAddress[0], fromAddress[1], fromAddress[2], fromAddress[3], this.findAddressContext(method, fromAddress[0]))
          },
          destination: {
            tooltip: fmt('<div><h6>Destination</h6><p><i class="fa fa-map-marker to_address"></i>&nbsp; %s<br/>%s, %s %s</p><p class="context">%s</p></div>', toAddress[0], toAddress[1], toAddress[2], toAddress[3], this.findAddressContext(method, toAddress[0]))
          }
        }
      });
    }
    
    if (method === 'ratesForLocation') {
      var extraParams = (methodParams) ? _.flatten(methodParams).join(' ') : '';
      this.props.onChange({
        location: methodArgs[0] + extraParams,
        destination: null
      });
    }
  },
  findAddressContext: function(method, address) {
    var matches = [];
    
    _.each(apiData.tasks[method].presets, function(preset) {
      matches = _.filter(preset.data, function(item) {
        if (item._type === 'address') {
          if ((item.from_street && item.from_street === address) || (item.to_street && item.to_street === address)) {
            return true;
          }
        }
      });
    });
    
    if (matches.length) {
      return _.head(matches)._context || '';
    } else {
      return '';
    }
  },
  render: function() {
    var options = {
      mode: 'javascript',
      theme: 'railscasts',
      scrollbarStyle: 'overlay'
    };
    
    return (
      <div className="request">
        <div className="header">
          <h3>Request</h3>
          <div className="toolbar">
            <CopyButton text={this.state.code} />
            <DocButton task={this.props.task} />
            <RunButton label={this.state.runStatus} onClick={this.runCode} />
          </div>
        </div>
        <Editor ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    );
  }
});