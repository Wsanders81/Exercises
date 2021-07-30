/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    
    let wordObj = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1];
      if (i == this.words.length - 1) {
        if (word in wordObj) {
          wordObj[word].push([null]);
          this.chains = wordObj

          return;
        } else {
          wordObj[word] = [null];
          this.chains = wordObj

          return;
        }
      }
      if (word in wordObj) {
        wordObj[word].push(nextWord);
      } else {
        wordObj[word] = [nextWord];
      }
    }
    console.log(this.chains)
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(Object.keys(this.chains))
    
    
    let output = []
    for(let i = 0; i < numWords; i++) {
      
      let random = Math.floor(Math.random() * keys.length)
      let text = keys[random]
      output.push(text)
      
  }
  return output.join(" ")
}
}
let mm = new MarkovMachine("the cat in the hat the hat for the hands on deck idle");
mm.makeText(65)

module.exports = {
  MarkovMachine
}