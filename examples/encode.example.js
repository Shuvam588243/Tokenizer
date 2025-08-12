const path = require('path');
const fs = require('fs');
const SimpleTokenizer = require('../tokenizer');

const vocabPath = path.join(__dirname, 'vocab.json');

const tokenizer = new SimpleTokenizer();
if (fs.existsSync(vocabPath)) {
  tokenizer.loadVocab(vocabPath);
  console.log('Loaded existing vocabulary.');
} else {
  console.log('No saved vocabulary found. Starting fresh.');
}

const text = "Do you know me?";
const encoded = tokenizer.encode(text);
console.log("Encoded:", encoded);