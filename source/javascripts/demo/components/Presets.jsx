var Presets = React.createClass({
  getInitialState: function() {
    this.data = apiData.tasks.taxForOrder;

    return {
      task: 'taxForOrder',
      preset: {
        nexus_address: _.first(this.data.presets.nexus_address),
        line_items: [_.first(this.data.presets.line_items)],
        to_addresses: _.first(this.data.presets.to_addresses),
        amount: this.data.defaults.amount,
        shipping: this.data.defaults.shipping
      }
    };
  },
  selectTask: function(e) {
    var preset = {};
    this.data = apiData.tasks[e.target.value];
    
    _.merge(preset, this.data.defaults || {});
    _.each(this.data.presets, function(preset) {
      if (_.isArray(preset)) {
        var firstPreset = (preset._multiple) ? [_.first(preset)] : _.first(preset);
        _.merge(preset, firstPreset);
      }
    });
    
    this.setState({ task: e.target.value, preset: preset });
  },
  selectOption: function(data) {
    var preset = this.state.preset;
    
    if (data.option._type === 'product') {
      var items = this.state.preset.line_items;
      var amount = 0;

      if (!_.some(items, { id: data.option.id })) items.push(data.option);
      
      _.each(items, function(item) {
        amount += item.unit_price;
      });
      
      preset.line_items = items;
      preset.amount = amount;
    } else {
      preset[data.preset] = data.option;
    }
    
    // this.setState({ preset: preset });
    _.defer(function() { this.props.onChange(this.state.preset); }.bind(this));
  },
  renderPresets: function() {
    var self = this;
    var presets = [];
    
    _.each(this.data.presets, function(preset, key) {
      var options = [];

      _.each(preset, function(option) {
        switch(option._type) {
          case 'address':
            options.push(<div key={'option-' + option._name} onClick={self.selectOption.bind(self, { option: option, preset: key })}>{self.renderAddress(option)}</div>);
            break;
          case 'product':
            options.push(<div key={'option-' + option._name} onClick={self.selectOption.bind(self, { option: option, preset: key })}>{self.renderProduct(option)}</div>);
            break;
        }
      });

      presets.push(<div key={'preset-' + key} className="preset">{options}</div>);
    });

    return (
      <div>{presets}</div>
    );
  },
  renderAddress: function(option) {
    var fromOrTo = (option.from_country) ? 'from_' : 'to_';
    return (
      <div>
        <h4>{option.name}</h4>
        <p>{option[fromOrTo+'street']}<br/>{option[fromOrTo+'city']}, {option[fromOrTo+'state']} {option[fromOrTo+'zip']}</p>
      </div>
    );
  },
  renderProduct: function(option) {
    return (
      <div>
        <h4>{option.name}</h4>
        <p>${option.unit_price}</p>
      </div>
    );
  },
  render: function() {
    return (
      <div className="presets">
        <select onChange={this.selectTask}>
          <option value="categories">List tax categories</option>
          <option value="ratesForLocation">Show tax rates for a location</option>
          <option value="taxForOrder">Calculate sales tax for an order</option>
          <option value="listOrders">List orders</option>
          <option value="createOrder">Create an order</option>
        </select>
        {this.renderPresets()}
      </div>
    );
  }
});