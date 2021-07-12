//= require classnames
//= require esprima
//= require lodash/lodash
//= require clipboard/dist/clipboard
//= require ./demo/data
//= require ./demo/vendor/fmt
//= require ./demo/vendor/rocambole
//= require ./demo/vendor/reqwest
//= require_tree ./demo/components

L.mapbox.accessToken = 'pk.eyJ1IjoiamFrZXRheGphciIsImEiOiJja28zNDA4Y3cwemg2MnBuc2p5Y3RyOGRtIn0.xcKzob7XS8zBmXblI6WZzQ';

ReactDOM.render(
  React.createElement(Sandbox, null),
  document.getElementById('demo')
);