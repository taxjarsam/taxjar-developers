var Presets = React.createClass({
  getInitialState: function() {
    return {
      nexus: _.first(presets.nexus_addresses),
      line_items: [_.first(presets.line_items)],
      to_addresses: _.first(presets.to_addresses)
    };
  },
  componentWillMount: function() {
    
  },
  componentDidMount: function() {
    console.log(this.state);
  },
  selectNexus: function(nexus) {
    this.setState({ nexus: nexus });
    _.defer(function() { this.props.onChange(this.state); }.bind(this));
  },
  selectItem: function(item) {
    var items = this.state.items;
    items[item.name] = item.amount;
    this.setState({ line_items: items });
    _.defer(function() { this.props.onChange(this.state); }.bind(this));
  },
  renderNexus: function() {
    var self = this;
    return (
      <div>
        {presets.nexus_addresses.map(function(nexus, i) {
          return (
            <div key={'nexus-' + i} onClick={self.selectNexus.bind(self, nexus)}>
              <h4>{nexus.name}</h4>
              <p>{nexus.from_street}<br/>{nexus.from_city}, {nexus.from_state} {nexus.from_zip}</p>
            </div>
          );
        })}
      </div>
    );
  },
  renderItems: function() {
    var self = this;
    return (
      <div>
        {presets.line_items.map(function(item, i) {
          return (
            <div key={'item-' + i} onClick={self.selectItem.bind(self, item)}>
              <h4>{item.name}</h4>
              <p>${item.unit_price}</p>
            </div>
          );
        })}
      </div>
    );
  },
  renderDestinations: function() {
    
  },
  render: function() {
    return (
      <div className="presets">
        {this.renderNexus()}
        {this.renderItems()}
        {this.renderDestinations()}
      </div>
    );
  }
});