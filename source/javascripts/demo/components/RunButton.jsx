var RunButton = React.createClass({
  renderIcon: function() {
    if (this.props.label === 'Running') {
      return <i className="fa fa-circle-o-notch fa-spin"></i>;
    } else if (this.props.label === 'Done') {
      return <i className="fa fa-check"></i>;
    } else {
      return <i className="fa fa-play"></i>;
    }
  },
  render: function() {
    return (
      <button className="toolbar__btn toolbar__btn--primary" onClick={this.props.onClick}>{this.renderIcon()} {this.props.label || 'Run'}</button>
    );
  }
});