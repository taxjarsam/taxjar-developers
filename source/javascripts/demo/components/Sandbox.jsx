var fmt = require('demo/vendor/fmt');

var Sandbox = React.createClass({
  getInitialState: function() {
    return {
      location: '350 5th Avenue, New York, NY 10118',
      destination: '668 Route Six, Mahopac, NY 10541'
    };
  },
  handlePresets: function(task, presets) {
    var newLine = '\n';
    var code = ['taxjar.' + task + '('];
    var args = apiData.tasks[task].args || [];
    var propCount;
    var presetCount = 1;
    var trailing;
    
    var data = {};
    
    _.each(args, function(arg) {
      code += fmt('"%s", ', _.find(presets, arg)[arg]);
    });
    
    _.each(presets, function(preset, presetKey) {
      if (presetKey === 'line_items') {
        preset = { 'line_items': preset };
      }
      if (!_.isObject(preset)) {
        preset = _.pick(presets, presetKey);
      }
      _.merge(data, preset);
    });
    
    data = _.omit(data, function(prop, key) { return (_.startsWith(key, '_') || _.includes(args, key)); });
    
    _.each(data, function(prop, key) {
      if (_.isObject(prop) || _.isArray(prop)) {
        _.each(prop, function(subprop, subkey) {
          data[key][subkey] = _.omit(subprop, function(p, k) { return (_.startsWith(k, '_')); });
        });
      }
    });

    code += JSON.stringify(data, null, 2);
    code += ');';

    this.setState({ presetCode: code, task: task });
  },
  handleRequest: function(requestState) {
    this.setState(requestState);
  },
  render: function() {
    return (
      <div className="sandbox">
        <div className="sidebar">
          <Presets onChange={this.handlePresets} />
        </div>
        <div className="editor">
          <Preview type="map" location={this.state.location} destination={this.state.destination} metadata={this.state.mapData} />
          <div className="split-pane">
            <Request prefill={this.state.presetCode} task={this.state.task} onChange={this.handleRequest} />
            <Response prefill={this.state.presetResponse} task={this.state.task} loading={this.state.loadingResponse} error={this.state.errorResponse} />
          </div>
        </div>
      </div>
    );
  }
});