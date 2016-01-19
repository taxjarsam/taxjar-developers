var RunButton = React.createClass({
  renderIcon: function() {
    if (this.props.label === 'Running') {
      return <i className="fa fa-circle-o-notch fa-spin"></i>;
    } else if (this.props.label === 'Done') {
      return <i className="fa fa-check"></i>;
    } else if (this.props.label === 'Error') {
      return <i className="fa fa-warning"></i>;
    } else {
      return <i className="fa fa-play"></i>;
    }
  },
  renderClass: function() {
    if (this.props.label === 'Error') {
      return 'toolbar__btn--error';
    } else {
      return 'toolbar__btn--primary';
    }
  },
  render: function() {
    return (
      <button className={'toolbar__btn ' + this.renderClass()} onClick={this.props.onClick}>{this.renderIcon()} {this.props.label || 'Run'}</button>
    );
  }
});