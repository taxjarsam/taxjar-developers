//= require classnames
//= require esprima
//= require lodash
//= require lodash-deep
//= require ./demo/fmt.module
//= require ./demo/rocambole.module
//= require ./demo/data
//= require_tree ./demo/components

L.mapbox.accessToken = 'pk.eyJ1IjoiamFrZXRheGphciIsImEiOiJjaWo0cWJkM3cwMDNqdXJrcmM0MWt4enNuIn0.16PIitx_ccoMZEIEnkG7pQ';

ReactDOM.render(
  React.createElement(Sandbox, null),
  document.getElementById('demo')
);