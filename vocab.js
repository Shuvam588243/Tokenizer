const fs = require('fs');
const SimpleTokenizer = require('./tokenizer');

const tokenizer = new SimpleTokenizer();

const rawData = fs.readFileSync('sentences.json', 'utf8');
const sentences = JSON.parse(rawData);

const loadNewConversation = fs.readFileSync('conversation.json', 'utf8');
const newSentences = JSON.parse(loadNewConversation);

tokenizer.train(sentences);
tokenizer.train(newSentences);

console.log("Vocabulary", tokenizer.vocab);