var Preview = React.createClass({
  renderMap: function() {
    if (this.props.type === 'map' && this.props.location) {
      return (
        <Map
          mapId="mapbox.streets"
          location={this.props.location}
          destination={this.props.destination}
          metadata={this.props.metadata}
          tooltip={this.props.tooltip}
          disableDragAndZoom={true}
          zoomControl={false}
          center={[59.907433, 30.299848]}
          zoom={17}
        />
      );
    }
  },
  render: function() {
    return (
      <div className="preview">
        {this.renderMap()}
      </div>
    );
  }
});