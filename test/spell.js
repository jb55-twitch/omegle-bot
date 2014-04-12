
var badwords = require('../lib/spell');
var assert = require('better-assert');
var summary = require('../lib/summarize');

describe('spell', function(){
  it('returns mispelled words', function(done){

    badwords(["yuo", "u", "hi", "sdkfjsdf"], function(err, words){
      if (err) return done(err);
      assert("yuo" === words[0]);
      assert("sdkfjsdf" === words[1]);
      done();
    });

  });

  it('report works', function(done){

    var msg = "qt lol";
    var words = msg.split(" ");
    badwords(words, function(err, mispelled){
      var report = summary(words, mispelled);
      console.log(report.join("\n"));
      done();
    });
  });
});
