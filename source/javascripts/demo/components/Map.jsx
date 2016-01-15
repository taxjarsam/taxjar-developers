var Map = React.createClass({
  getInitialState: function() {
    return {
      tooltip: ''
    };
  },
  componentDidMount: function(argument) {
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
    
    if (this.props.location) {
      this.setLocation(this.props.location);
    }
    
    if (this.props.destination) {
      this.setDestination(this.props.destination);
    }
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
    var features = [];
    
    if (this.state.locationCoords) {
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: this.state.locationCoords
        },
        properties: {
          'title': (this.state.metadata) ? this.state.metadata.location.title : null,
          'address': (this.state.metadata) ? this.state.metadata.location.address : null,
          'marker-color': '#3FAE2A',
          'marker-symbol': 'industrial'
        }
      });
    }
    
    if (this.state.destinationCoords) {
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: this.state.destinationCoords
        },
        properties: {
          'title': (this.state.metadata) ? this.state.metadata.destination.title : null,
          'address': (this.state.metadata) ? this.state.metadata.destination.address : null,
          'marker-color': '#EF9A04',
          'marker-symbol': 'star'
        }
      });
    }
    
    if (this.state.locationCoords && this.state.destinationCoords) {
      features.push({
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
      features: features
    });
    
    this.layer.on('click', function(e) {
      e.layer.closePopup();
    });
    
    this.layer.on('mouseover', function(e) {
      var feature = e.layer.feature;
      var context = '';
      
      if (!feature.properties.address) return;
      
      _.each(features, function(feature) {
        feature.properties['marker-size'] = 'medium';
      });

      feature.properties['marker-size'] = 'large';

      self.layer.setGeoJSON({
        type: 'FeatureCollection',
        features: features
      });
      
      _.each(apiData.tasks.taxForOrder.presets, function(preset) {
        _.each(preset.data, function(item) {
          if (item._type === 'address') {
            if ((item.from_street && item.from_street === feature.properties.address[0]) || (item.to_street && item.to_street === feature.properties.address[0])) {
              context = item._context;
            }
          }
        });
      });
      
      var content = '<div>';
      content += '<h6>' + feature.properties.title + '</h6>';
      content += '<p><i class="fa fa-map-marker"></i>&nbsp; ' + feature.properties.address[0] + '<br/>' + feature.properties.address[1] + ', ' + feature.properties.address[2] + ' ' + feature.properties.address[3] + '</p>';
      if (context) content += '<p class="context">' + context + '</p>';
      content += '</div>';
      self.setState({ tooltip: content });
    });
    
    if (features.length === 1 && this.state.locationCoords) {
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
      <div style={mapStyle}>
        {this.renderTooltip()}
      </div>
    );
  }
});