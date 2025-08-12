const path = require('path');
const fs = require('fs');
const SimpleTokenizer = require('../tokenizer');

const filePath = path.join(__dirname, '..', 'sentences.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const sentences = JSON.parse(rawData);

const tokenizer = new SimpleTokenizer();
tokenizer.train(sentences);

const tokens = [ 79, 35, 1, 15 ];
const decode = tokenizer.decode(tokens);
console.log("Decoded:", decode);