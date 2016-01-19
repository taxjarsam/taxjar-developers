var DocButton = React.createClass({
  renderHref: function() {
    if (this.props.task) {
      return apiData.tasks[this.props.task].docs;
    } else {
      return '#';
    }
  },
  render: function() {
    return (
      <a href={this.renderHref()} className="toolbar__btn" target="_blank"><i className="fa fa-book"></i> Docs</a>
    );
  }
});