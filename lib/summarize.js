
var spell = require('./spell');
var format = require('util').format;

function report(iq, mispelled) {
  return [
    "Mispellings: " + mispelled.join(", "),
    format("You spelled %s percent of your words correctly", iq * 100)
  ];
}

module.exports = function summarize(words, mispelled, last) {
  if (words.length === 0)
    return "What was that?";

  var iq = 1 - (mispelled.length / words.length);
  var responses = report(iq, mispelled);

  if (iq === 0) {
    responses.push("That's about as smart as a bag of rocks");
  }
  else if (iq < 0.5) {
    responses.push("That's pretty bad. You should be ashamed.");
  }
  else if (iq < 0.8) {
    responses.push("You almost spelled everything correctly.");
  }
  else if (iq === 1) {
    responses.push("That'll do pig. That'll do");
  }

  return responses;
};
