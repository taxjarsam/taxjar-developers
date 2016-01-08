var rocambole = require('demo/vendor/rocambole');

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
          self.props.onChange({ errorResponse: err.responseText, loadingResponse: false });
        },
        success: function(res) {
          res = _.result(res, Object.keys(res)[0]);
          responseText = JSON.stringify(res, null, 2);
          self.setState({ runStatus: 'Done' });
          _.delay(function() { self.setState({ runStatus: 'Run' }); }, 1000);
          self.props.onChange({ presetResponse: responseText, loadingResponse: false });
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

      this.props.onChange({
        location: fromAddress.join(' '),
        destination: toAddress.join(' ')
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