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
    this.conversationLog = [];
  }

  initialize({
     vocabPath = path.join(__dirname, 'vocab.json'),
     conversationPath = path.join(__dirname, 'conversation.json'),
     sentencesPath = path.join(__dirname, 'sentences.json'),
  } = {}) {
    let baseData = [];
    let convData = [];

    if (fs.existsSync(sentencesPath)) {
      try {
        baseData = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
        if (!Array.isArray(baseData)) baseData = [];
      } catch {
        baseData = [];
      }
    }

    if (fs.existsSync(conversationPath)) {
      try {
        convData = JSON.parse(fs.readFileSync(conversationPath, 'utf8'));
        if (!Array.isArray(convData)) convData = [];
      } catch {
        convData = [];
      }
    }

    this.train(baseData);
    this.train(convData);

    this.saveVocab(vocabPath);
    console.log(`Vocabulary initialized and saved to ${vocabPath}`);
  }

  loadVocab(filePath = path.join(__dirname, 'vocab.json')) {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      this.vocab = data.vocab;
      this.invVocab = data.invVocab;
      this.nextId = data.nextId;
    }
  }

  saveVocab(filePath = path.join(__dirname, 'vocab.json')) {
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          vocab: this.vocab,
          invVocab: this.invVocab,
          nextId: this.nextId,
        },
        null,
        2
      ),
      'utf8'
    );
  }

  exportVocab(filePath) {
    fs.writeFileSync(filePath, JSON.stringify(this.vocab, null, 2), 'utf8');
  }

  importVocab(filePath) {
    const vocab = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    this.vocab = vocab;
    this.invVocab = Object.fromEntries(
      Object.entries(vocab).map(([k, v]) => [v, k])
    );
    this.nextId = Math.max(...Object.values(vocab)) + 1;
  }

  flushConversations(filePath = path.join(__dirname, 'conversation.json')) {
    if (this.conversationLog.length > 0) {
      let existing = [];
      if (fs.existsSync(filePath)) {
        try {
          existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (!Array.isArray(existing)) existing = [];
        } catch {
          existing = [];
        }
      }
      existing.push(...this.conversationLog);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
      this.conversationLog = [];
    }
  }

  addToken(token) {
    if (!(token in this.vocab)) {
      this.vocab[token] = this.nextId;
      this.invVocab[this.nextId] = token;
      this.nextId++;
    }
    return this.vocab[token];
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
      .match(/\b[\w'-]+\b/g) || [];
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
        newWordFound = true;
        ids.push(this.addToken(token));
        console.log('Saving to vocab');
        this.saveVocab();
      }
    }

    if (newWordFound) {
      this.conversationLog.push(text);
    }
    return ids;
  }

  decode(ids) {
    let tokens = [];
    for (let id of ids) {
      if (this.invVocab[id] !== undefined) {
        tokens.push(this.invVocab[id]);
      } else {
        tokens.push('[UNK]');
      }
    }
    return tokens.join(' ');
  }
}

module.exports = SimpleTokenizer;
