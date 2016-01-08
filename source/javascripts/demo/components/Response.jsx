var Response = React.createClass({
  getInitialState: function() {
    return {
      response: "// Response"
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.prefill !== this.state.prefill && nextProps.prefill != this.state.value) {
      this.setState({ prefill: nextProps.prefill, response: nextProps.prefill });
    }
  },
  render: function() {
    var options = {
      mode: 'javascript',
      theme: 'railscasts',
      readOnly: true
    };
    
    return (
      <div className="response">
        <div className="header">
          <h3>Response</h3>
        </div>
        <Editor ref="editor" value={this.state.response} options={options} />
      </div>
    );
  }
});