const fs = require('fs');
const SimpleTokenizer = require('./tokenizer');

const tokenizer = new SimpleTokenizer();

const rawData = fs.readFileSync('sentences.json', 'utf8');
const sentences = JSON.parse(rawData);

tokenizer.train(sentences);

// examples
// microservices architecture is amazing


const text = "is Microservice a better choice then monolithic?";
const encoded = tokenizer.encode(text);
console.log("Encoded:", encoded);

const tokensToDecode = encoded;
const decoded = tokenizer.decode(tokensToDecode);
console.log("Decoded:", decoded);
