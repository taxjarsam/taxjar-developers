var Request = React.createClass({
  getInitialState: function() {
    return {
      code: "// Code"
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
    this.props.onChange(newCode);
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
  render: function() {
    var options = {
      mode: 'javascript',
      theme: 'railscasts'
    };
    
    return (
      <div className="request">
        <div className="header">
          <h3>Request</h3>
        </div>
        <Editor ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    );
  }
});