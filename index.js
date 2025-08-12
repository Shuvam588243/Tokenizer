const fs = require('fs');
const path = require('path');
const SimpleTokenizer = require('./tokenizer');

const tokenizer = new SimpleTokenizer();

const vocabPath = path.join(__dirname, 'vocab.json');
const conversationPath = path.join(__dirname, 'conversation.json');
const sentencesPath = path.join(__dirname, 'sentences.json');

if (fs.existsSync(vocabPath)) {
  tokenizer.loadVocab(vocabPath);
  console.log('Loaded existing vocabulary.');
} else {
  console.log('No saved vocabulary found. Starting fresh.');
}

if (fs.existsSync(sentencesPath)) {
  const baseData = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  tokenizer.train(baseData);
}

if (fs.existsSync(conversationPath)) {
  const convData = JSON.parse(fs.readFileSync(conversationPath, 'utf8'));
  tokenizer.train(convData);
}

console.log("Vocabulary:", tokenizer.vocab);

tokenizer.saveVocab(vocabPath);
console.log(`Vocabulary saved to ${vocabPath}`);
