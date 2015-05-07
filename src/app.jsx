var React = require('react');
var _ = require('underscore');
var openpgp = require('../bower_components/openpgp/dist/openpgp.js');
var PUBLIC_KEY = require("raw!../charleslavery.txt");
var publicKey = openpgp.key.readArmored(PUBLIC_KEY);

var App = React.createClass({
  getInitialState() {
    return {
      encrypted: ''
    };
  },
  componentDidMount: function() {
  },

  didClickEncrypt: function(ev) {
    ev.preventDefault();
    var source = this.refs.source.getDOMNode().value;
    
    openpgp.encryptMessage(publicKey.keys, source).then((pgpMessage) => {
      this.setState( {encrypted:pgpMessage} );
    }).catch(function(error) {
      console.log(error);
    });  
  },

  render: function() {
    var encrypted = this.state.encrypted;

    return (
      <div className="container" style={style.container}>
        <div className="row">
          <h1>Securely Message Charles Lavery</h1>
          <label>Enter Message Here:</label><br/>
          <textarea style={style.container} className="form-control" rows="20" ref="source"></textarea><br/>
          <button className="btn btn-primary" onClick={this.didClickEncrypt}>Click To Encrypt</button>
        </div>
        <div className="row">
          <hr/>
          <label>Copy Secure Message Below Into File/Email</label><br/>
          <textarea style={style.textAreas} className="form-control" rows="20" readOnly value={encrypted}></textarea>
        </div>
      </div>
    );
  }
});

console.log(PUBLIC_KEY);

var style = {
  container: {
    maxWidth: 800
  },
  textAreas: {
    fontFamily: 'monospace'
  }
};

module.exports = App;
