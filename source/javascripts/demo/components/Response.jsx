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
    if (this.props.error) {
      return (
        <div className="state">
          <div className="error">{this.props.error}.</div>
        </div>
      );
    } else if (_.isEmpty(this.state.response)) {
      return (
        <div className="state">
          <div className="empty"><p>Click <RunButton /> to calculate sales tax for this order.</p></div>
        </div>
      );
    }
  },
  render: function() {
    var options = {
      mode: 'javascript',
      theme: 'railscasts',
      scrollbarStyle: 'overlay',
      readOnly: true
    };
    
    return (
      <div className="response">
        <div className="header">
          <h3>Response</h3>
          <div className="toolbar">
            <CopyButton text={this.state.response} />
          </div>
        </div>
        {this.renderState()}
        <Editor ref="editor" value={this.state.response} options={options} />
      </div>
    );
  }
});