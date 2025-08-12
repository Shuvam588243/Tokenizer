const path = require('path');
const fs = require('fs');
const SimpleTokenizer = require('../tokenizer');

const filePath = path.join(__dirname, '..', 'sentences.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const sentences = JSON.parse(rawData);

const tokenizer = new SimpleTokenizer();
tokenizer.train(sentences);

const text = "Do you know me?";
const encoded = tokenizer.encode(text);
console.log("Encoded:", encoded);