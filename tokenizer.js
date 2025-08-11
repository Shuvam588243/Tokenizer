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
    for (let token of tokens) {
      if (this.vocab[token] !== undefined) {
        ids.push(this.vocab[token]);
      } else {
        ids.push(this.specialTokens["[UNK]"]);
      }
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
