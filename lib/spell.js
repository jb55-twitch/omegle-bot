
var spawn = require('child_process').spawn;
var from = require('from');
var split = require('split');
var reduce = require('stream-reduce');
var once = require('once');

module.exports = function(words, done) {
  done = once(done);
  var cmd = spawn('spell');
  words = words.map(function(word){
    return word + '\n';
  });

  from(words).pipe(cmd.stdin);

  cmd.stdout
  .pipe(split())
  .pipe(reduce(function(acc, item){
    acc.push(item);
    return acc;
  }, []))

  .on('data', function(mispelled){
    return done(null, mispelled.filter(function(str){
      return str !== "";
    }));
  });

};
