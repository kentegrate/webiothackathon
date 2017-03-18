const App = require('./App.jsx');

const React = require('react');
const ReactDOM = require('react-dom');

const reload_lib = require('./reload.js');

ReactDOM.render(React.createElement(App), document.getElementById('app'));
