var Response = React.createClass({
  getInitialState: function() {
    return {
      code: "// Response"
    };
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
        <Editor ref="editor" value={this.state.code} options={options} />
      </div>
    );
  }
});