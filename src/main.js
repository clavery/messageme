var React = require('react');
var App = require('./app');

var style = require('./style.scss');

// render app (router component) into page
React.render(React.createElement(App), document.body);


// register objects into window for debugging
if (DEBUG) {
  global.React = React;
}


