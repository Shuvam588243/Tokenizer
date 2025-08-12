const fs = require('fs');
const path = require('path');
const SimpleTokenizer = require('./tokenizer');

const vocabPath = path.join(__dirname, 'vocab.json');
const conversationPath = path.join(__dirname, 'conversation.json');
const sentencesPath = path.join(__dirname, 'sentences.json');

const tokenizer = new SimpleTokenizer();

tokenizer.initialize({
    vocabPath,
    conversationPath,
    sentencesPath,
});

console.log("Vocabulary:", tokenizer.vocab);

tokenizer.saveVocab(vocabPath);
console.log(`Vocabulary saved to ${vocabPath}`);
