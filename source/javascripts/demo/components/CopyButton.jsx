var CopyButton = React.createClass({
  getInitialState: function() {
    return {
      copied: false
    };
  },
  componentDidMount: function() {
    var self = this;
    var clipboard = new Clipboard(this.refs.btn);
    
    clipboard.on('success', function(e) {
      self.setState({ copied: true });
      _.delay(function() { self.setState({ copied: false }); }, 3000);
    });
    
    clipboard.on('error', function(e) {
      self.setState({ copied: false });
    });
  },
  renderLabel: function() {
    var label = (this.state.copied) ? 'Copied' : 'Copy';
    return (
      <span>{label}</span>
    );
  },
  render: function() {
    return (
      <button ref="btn" className="toolbar__btn" data-clipboard-text={this.props.text} data-clipboard-target={this.props.target}><i className="fa fa-clipboard"></i> {this.renderLabel()}</button>
    );
  }
});