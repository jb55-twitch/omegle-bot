#!/usr/bin/env node

var Omegle = require('omegle').Omegle;
var async = require('async');
var spell = require('./lib/spell')
var summarize = require('./lib/summarize')

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
  
  function sender(line, done){
    om.send(line, function(){
      console.log("sent message " + line);
      done();
    });
  }

  om.on('gotMessage', function(msg){
    var words = msg.split(" ");
    spell(words, function(err, mispelled){
      var lines = summarize(words, mispelled);
      async.each(lines, sender.bind(null));
    });
  });

//om.on('gotMessage', function(message){
//  var reverse = message.split("").reverse().join("");
//  om.send(reverse, function(){
//    console.log("sent message: " + reverse);
//  });
//});

};

if (!module.parent)
  module.exports();
