const fs = require('fs');
const SimpleTokenizer = require('./tokenizer');

const tokenizer = new SimpleTokenizer();

const rawData = fs.readFileSync('sentences.json', 'utf8');
const sentences = JSON.parse(rawData);

tokenizer.train(sentences);

const text = "Do you know me?";
const encoded = tokenizer.encode(text);
console.log("Encoded:", encoded);

const tokensToDecode = [120, 7, 230, 1];
const decoded = tokenizer.decode(tokensToDecode);
console.log("Decoded:", decoded);
