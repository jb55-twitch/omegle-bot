#!/usr/bin/env node

var Omegle = require('omegle').Omegle;

module.exports = function() {
  var om = new Omegle();

  om.start(function(err){
    if (err) console.error(err);
  });

  om.on('recaptchaRequired', function(url) {
    console.log(url);
  });

  var events = [
    'connected',
    'count',
    'error',
    'gotMessage',
    'question',
    'recaptchaRejected',
    'recaptchaRequired',
    'spyDisconnected',
    'spyMessage',
    'spyStoppedTyping',
    'spyTyping',
    'stoppedTyping',
    'strangerDisconnected',
    'suggestSpyee',
    'typing',
    'waiting'
  ];

  events.forEach(function(event){
    om.on(event, function(){
      var args = [].slice.call(arguments);
      args.unshift(event);
      console.log.apply(null, args);
    });
  });

  om.on('gotMessage', function(message){
    var reverse = message.split("").reverse().join("");
    om.send(reverse, function(){
      console.log("sent message: " + reverse);
    });
  });

};

if (!module.parent)
  module.exports();
