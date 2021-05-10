//= require classnames
//= require esprima
//= require lodash
//= require clipboard
//= require ./demo/data
//= require_tree ./demo/vendor
//= require_tree ./demo/components

L.mapbox.accessToken = 'pk.eyJ1IjoiamFrZXRheGphciIsImEiOiJja28zNDA4Y3cwemg2MnBuc2p5Y3RyOGRtIn0.xcKzob7XS8zBmXblI6WZzQ';

ReactDOM.render(
  React.createElement(Sandbox, null),
  document.getElementById('demo')
);