const fs = require('fs');
const SimpleTokenizer = require('../tokenizer');
const tokenizer = new SimpleTokenizer();

const rawData = fs.readFileSync('sentences.json', 'utf8');
const sentences = JSON.parse(rawData);

tokenizer.train(sentences);

const tokens = [ 120, 7, 230, 1 ];
const decode = tokenizer.decode(tokens);
console.log("Decoded:", decode);