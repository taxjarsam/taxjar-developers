var Response = React.createClass({
  getInitialState: function() {
    return {
      response: ''
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.prefill !== this.state.prefill && nextProps.prefill != this.state.value) {
      this.setState({ prefill: nextProps.prefill, response: nextProps.prefill });
    }
  },
  renderState: function() {
    if (this.props.loading) {
      return (
        <div className="loader">Loading!</div>
      );
    } else if (this.props.error) {
      return (
        <div className="error">{this.props.error}</div>
      );
    } else if (_.isEmpty(this.state.response)) {
      return (
        <div className="empty">Do something!</div>
      );
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
        <div className="state">
          {this.renderState()}
        </div>
        <Editor ref="editor" value={this.state.response} options={options} />
      </div>
    );
  }
});