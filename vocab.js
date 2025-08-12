const fs = require('fs');
const SimpleTokenizer = require('./tokenizer');

const tokenizer = new SimpleTokenizer();

const rawData = fs.readFileSync('sentences.json', 'utf8');
const sentences = JSON.parse(rawData);

tokenizer.train(sentences);

console.log("Vocabulary", tokenizer.vocab);