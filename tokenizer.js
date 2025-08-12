const fs = require('fs');
const path = require('path');

class SimpleTokenizer {
  constructor() {
    this.vocab = {};
    this.invVocab = {};
    this.specialTokens = {
      "[PAD]": 0,
      "[UNK]": 1,
      "[CLS]": 2,
      "[SEP]": 3,
    };

    for (let token in this.specialTokens) {
      const id = this.specialTokens[token];
      this.vocab[token] = id;
      this.invVocab[id] = token;
    }

    this.nextId = Object.keys(this.specialTokens).length;
  }

  train(texts) {
    for (let text of texts) {
      let tokens = this.tokenize(text);
      for (let token of tokens) {
        if (!(token in this.vocab)) {
          this.vocab[token] = this.nextId;
          this.invVocab[this.nextId] = token;
          this.nextId++;
        }
      }
    }
  }

  tokenize(text) {
    return text
      .toLowerCase()
      .split(/\s+/)
      .map(t => t.replace(/[^\w]/g, ''))
      .filter(word => word.length > 0);
  }

  encode(text) {
    let tokens = this.tokenize(text);
    let ids = [];
    let newWordFound = false;


    for (let token of tokens) {
      if (this.vocab[token] !== undefined) {
        ids.push(this.vocab[token]);
      } else {
        console.log(`Detected new word - [${token}]`);
        newWordFound=true;
        this.vocab[token] = this.nextId;
        this.invVocab[this.nextId] = token;
        this.nextId++;
        ids.push(this.vocab[token])
      }
    }

    if(newWordFound){
      const filePath = path.join(__dirname, 'conversation.json');
        let existing = [];
        if (fs.existsSync(filePath)) {
            try {
                existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            } catch {
                existing = [];
            }
        }
        existing.push(text);
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
    }
    return ids;
  }

  decode(ids) {
    let tokens = [];
    for (let id of ids) {
      if (this.invVocab[id] !== undefined) {
        tokens.push(this.invVocab[id]);
      } else {
        tokens.push("[UNK]");
      }
    }
    return tokens.join(' ');
  }
}

module.exports = SimpleTokenizer;
