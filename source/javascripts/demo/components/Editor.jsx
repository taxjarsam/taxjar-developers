var Editor = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		onFocusChange: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
		className: React.PropTypes.any
	},
	getInitialState: function() {
		return {
			isFocused: false
		};
	},
	componentDidMount: function() {
		var textareaNode = this.refs.textarea;
		this.codeMirror = CodeMirror.fromTextArea(textareaNode, this.props.options);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this._currentCodemirrorValue = this.props.defaultValue || this.props.value || '';
		this.codeMirror.setValue(this._currentCodemirrorValue);
	},
	componentWillUnmount: function() {
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (this.codeMirror && nextProps.value !== undefined && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
		if (typeof nextProps.options === 'object') {
			for (var optionName in nextProps.options) {
				if (nextProps.options.hasOwnProperty(optionName)) {
					this.codeMirror.setOption(optionName, nextProps.options[optionName]);
				}
			}
		}
	},
	getCodeMirror: function() {
		return this.codeMirror;
	},
	focus: function() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},
	focusChanged: function(focused) {
		this.setState({
			isFocused: focused
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},
	codemirrorValueChanged: function(doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange && this.props.onChange(newValue);
	},
	render: function() {
		var editorClassName = classNames('ReactCodeMirror', this.state.isFocused ? 'ReactCodeMirror--focused' : null, this.props.className);

		return React.createElement(
			'div',
			{ className: editorClassName },
			React.createElement('textarea', { ref: 'textarea', name: this.props.path, defaultValue: '', autoComplete: 'off' })
		);
	}
});