var Map = React.createClass({
  getInitialState: function() {
    return {
      tooltip: ''
    };
  },
  componentDidMount: function(argument) {
    var self = this;
    var props = this.props;
    var mapId = props.mapId || props.src || 'mapbox.streets';
    var options = {};
    var ownProps = ['mapId', 'onMapCreated'];

    for (var k in props) {
      if (props.hasOwnProperty(k) && ownProps.indexOf(k) === -1) {
        options[k] = props[k];
      }
    }
    
    this.map = L.mapbox.map(ReactDOM.findDOMNode(this), mapId, options);
    this.layer = L.mapbox.featureLayer().addTo(this.map);
    this.geocoder = L.mapbox.geocoder('mapbox.places');
    this.features = [];

    if (this.props.disableDragAndZoom) {
      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();
      this.map.keyboard.disable();
    }

    if (this.props.onMapCreated) {
      this.props.onMapCreated(this.map, L);
    }
    
    if (this.props.initialMarkers) {
      this.setInitialMarkers();
    }
    
    if (this.props.tooltip) {
      this.setState({ tooltip: this.props.tooltip });
    }
    
    this.layer.on('click', function(e) {
      e.layer.closePopup();
    });
    
    this.map.on('mouseover', function(e) {
      self.setState({ tooltip: self.props.tooltip });
    });
    
    this.layer.on('mouseover', function(e) {
      var feature = e.layer.feature;
      
      if (!feature.properties.tooltip) return;
      
      _.each(self.features, function(feature) {
        feature.properties['marker-size'] = 'medium';
      });

      feature.properties['marker-size'] = 'large';

      self.layer.setGeoJSON({
        type: 'FeatureCollection',
        features: self.features
      });

      self.setState({ tooltip: feature.properties.tooltip });
    });
  },
  componentWillUpdate: function(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setLocation(nextProps.location);
    }
    if (nextProps.destination !== this.props.destination) {
      this.setDestination(nextProps.destination);
    }
    if (nextProps.metadata !== this.props.metadata) {
      this.setState({ metadata: nextProps.metadata });
    }
    if (nextProps.tooltip != this.props.tooltip) {
      this.setState({ tooltip: nextProps.tooltip });
    }
  },
  setInitialMarkers: function() {
    var self = this;
    var addresses = this.props.initialMarkers;
    var addressPromises = [];
    
    _.each(addresses, function(address, i) {
      addressPromises.push(new Promise(function(resolve, reject) {
        self.geocoder.query(address, function(err, data) {
          if (data.latlng) {
            var feature = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [data.latlng[1], data.latlng[0]]
              },
              properties: {
                'marker-color': '#3FAE2A',
                'marker-symbol': 'circle'
              }
            };
            resolve(feature);
          } else {
            reject();
          }
        });
      }));
    });
    
    Promise.all(addressPromises).then(function(features) {
      self.layer.setGeoJSON({
        type: 'FeatureCollection',
        features: features
      });

      self.map.setView([36.795132, -82.402986], 4);
    });
  },
  setLocation: function(location) {
    var self = this;

    if (!location) {
      self.setState({ locationCoords: null });
      return _.defer(self.updateMap);
    }
    
    this.geocoder.query(location, function(err, data) {
      if (data.latlng) {
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        self.setState({ locationCoords: [data.latlng[1], data.latlng[0]] });
        _.defer(self.updateMap);
      }
    });
  },
  setDestination: function(destination) {
    var self = this;
    
    if (!destination) {
      self.setState({ destinationCoords: null });
      return _.defer(self.updateMap);
    }
    
    this.geocoder.query(destination, function(err, data) {
      if (data.latlng) {
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        self.setState({ destinationCoords: [data.latlng[1], data.latlng[0]] });
        _.defer(self.updateMap);
      }
    });
  },
  updateMap: function() {
    var self = this;
    
    this.features = [];
    
    if (this.state.locationCoords) {
      this.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: this.state.locationCoords
        },
        properties: {
          'tooltip': (this.state.metadata) ? this.state.metadata.location.tooltip : null,
          'marker-color': '#3FAE2A',
          'marker-symbol': 'industrial'
        }
      });
    }
    
    if (this.state.destinationCoords) {
      this.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: this.state.destinationCoords
        },
        properties: {
          'tooltip': (this.state.metadata) ? this.state.metadata.destination.tooltip : null,
          'marker-color': '#EF9A04',
          'marker-symbol': 'star'
        }
      });
    }
    
    if (this.state.locationCoords && this.state.destinationCoords) {
      this.features.push({
        type: 'Feature',
        properties: {
          color: '#000'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            this.state.locationCoords,
            this.state.destinationCoords
          ]
        }
      });
    }
    
    this.layer.setGeoJSON({
      type: 'FeatureCollection',
      features: this.features
    });
    
    if (this.features.length === 1 && this.state.locationCoords) {
      var location = this.state.locationCoords.slice().reverse();
      this.map.setView(location, 12);
    } else {
      this.map.fitBounds(this.layer.getBounds(), {
        padding: [25, 25]
      });
    }
  },
  renderTooltip: function() {
    if (this.state.tooltip) {
      return (
        <div ref="tooltip" className="map__tooltip"><div dangerouslySetInnerHTML={{__html: this.state.tooltip}} /></div>
      );
    }
  },
  render: function() {
    var mapStyle = {
      width: '100%',
      height: '100%'
    };

    return (
      <div className="map" style={mapStyle}>
        {this.renderTooltip()}
      </div>
    );
  }
});