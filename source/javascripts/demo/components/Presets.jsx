var Presets = React.createClass({
  getInitialState: function() {
    this.data = apiData.tasks.taxForOrder;

    return {
      task: 'taxForOrder',
      preset: {
        nexus_address: _.first(this.data.presets.nexus_address.data),
        line_items: [_.first(this.data.presets.line_items.data)],
        to_addresses: _.first(this.data.presets.to_addresses.data),
        amount: this.data.defaults.amount,
        shipping: this.data.defaults.shipping
      }
    };
  },
  componentDidMount: function() {
    this.props.onChange(this.state.task, this.state.preset);
  },
  selectTask: function(e) {
    var preset = {};
    this.data = apiData.tasks[e.target.value];
    
    if (this.data) {
      _.merge(preset, this.data.defaults || {});
      _.each(this.data.presets, function(p, key) {
        if (_.isArray(p.data)) {
          var firstPreset = {};
          firstPreset[key] = (p._multiple) ? [_.first(p.data)] : _.first(p.data);
          _.merge(preset, firstPreset);
        }
      });
    }

    this.setState({ task: e.target.value, preset: preset });
    _.defer(function() { this.props.onChange(this.state.task, this.state.preset); }.bind(this));
  },
  selectOption: function(data) {
    var preset = this.state.preset;
    
    if (this.data.presets[data.preset]._multiple === true) {
      var items = preset[data.preset];

      if (!_.some(items, { id: data.option.id })) {
        items.push(data.option);
      } else {
        _.remove(items, { id: data.option.id });
      }
      
      if (data.option.unit_price) {
        var amount = 0;

        _.each(items, function(item) {
          amount += item.unit_price;
        });

        preset.amount = amount;
      }
      
      preset[data.preset] = items;
    } else {
      preset[data.preset] = data.option;
    }
    
    this.setState({ preset: preset });
    _.defer(function() { this.props.onChange(this.state.task, this.state.preset); }.bind(this));
  },
  renderPresets: function() {
    var self = this;
    var presets = [];
    
    _.each(this.data.presets, function(preset, key) {
      var options = [];

      _.each(preset.data, function(option) {
        switch(option._type) {
          case 'address':
            options.push(<div key={'option-' + option._name} onClick={self.selectOption.bind(self, { option: option, preset: key })}>{self.renderAddress(option, key)}</div>);
            break;
          case 'location':
            options.push(<div key={'option-' + option._name} onClick={self.selectOption.bind(self, { option: option, preset: key })}>{self.renderLocation(option, key)}</div>);
            break;
          case 'product':
            options.push(<div key={'option-' + option._name} onClick={self.selectOption.bind(self, { option: option, preset: key })}>{self.renderProduct(option, key)}</div>);
            break;
        }
      });

      presets.push(
        <div key={'preset-' + key} className="preset">
          <h3>{preset._name}</h3>
          <p>{preset._description}</p>
          <div className="optionGroup">{options}</div>
        </div>
      );
    });

    return (
      <div>{presets}</div>
    );
  },
  renderAddress: function(option, presetKey) {
    var fromOrTo = (option.from_country) ? 'from_' : 'to_';
    var checked = (this.state.preset[presetKey]._name === option._name) ? true : false;

    return (
      <div className="option">
        <input type="radio" checked={checked} value={option._name} readOnly />
        <h4>{option._name}</h4>
        <p><i className={'fa fa-map-marker ' + fromOrTo + 'address' } />&nbsp; {option[fromOrTo+'street']}<br/>{option[fromOrTo+'city']}, {option[fromOrTo+'state']} {option[fromOrTo+'zip']}</p>
      </div>
    );
  },
  renderLocation: function(option, presetKey) {
    var checked = (this.state.preset[presetKey]._name === option._name) ? true : false;

    return (
      <div className="option">
        <input type="radio" checked={checked} value={option._name} readOnly />
        <h4>{option._name}</h4>
        <p>{option.city} {option.zip}</p>
      </div>
    );
  },
  renderProduct: function(option, presetKey) {
    var checked = (_.some(this.state.preset[presetKey], { id: option.id })) ? true : false;

    return (
      <div className="option">
        <input type="checkbox" checked={checked} value={option.id} readOnly />
        <h4>{option._name}</h4>
        <p>${option.unit_price}</p>
      </div>
    );
  },
  render: function() {
    return (
      <div className="presets">
        <div className="presets__menu">
          <select onChange={this.selectTask} value={this.state.task}>
            <option value="ratesForLocation">Show tax rates for a location</option>
            <option value="taxForOrder">Calculate sales tax for an order</option>
          </select>
        </div>
        {this.renderPresets()}
      </div>
    );
  }
});