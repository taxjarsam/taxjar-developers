var Sandbox = React.createClass({
  render: function() {
    return (
      <div className="sandbox">
        <div className="sidebar">
          <Presets />
        </div>
        <div className="content">
          <Preview />
          <div className="split-pane">
            <Request />
            <Response />
          </div>
        </div>
      </div>
    );
  }
});