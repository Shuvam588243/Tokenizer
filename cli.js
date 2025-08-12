const fs = require('fs');
const path = require('path');
const readline = require('readline');
const SimpleTokenizer = require('./tokenizer');

const tokenizer = new SimpleTokenizer();

const vocabPath = path.join(__dirname, 'vocab.json');
const conversationPath = path.join(__dirname, 'conversation.json');

if (fs.existsSync(vocabPath)) {
  tokenizer.loadVocab(vocabPath);
  console.log('Loaded existing vocabulary.');
} else {
  console.log('No saved vocabulary found. Starting fresh.');
}

let conversations = [];
if (fs.existsSync(conversationPath)) {
  try {
    conversations = JSON.parse(fs.readFileSync(conversationPath, 'utf8'));
  } catch {
    conversations = [];
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter "encode: <text>" or "decode: <ids comma separated>" or "exit":\n> '
});

console.log('Tokenizer CLI ready.');
rl.prompt();

rl.on('line', (line) => {
  line = line.trim();

  if (line.toLowerCase() === 'exit') {
    tokenizer.saveVocab(vocabPath);
    fs.writeFileSync(conversationPath, JSON.stringify(conversations, null, 2), 'utf8');
    rl.close();
    return;
  }

  const [command, ...rest] = line.split(' ');
  const arg = rest.join(' ');

  if (command === 'encode:') {
    const encoded = tokenizer.encode(arg);
    console.log('Encoded:', encoded);

    conversations.push(arg);
  } 
  else if (command === 'decode:') {
    try {
      const ids = arg.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      const decoded = tokenizer.decode(ids);
      console.log('Decoded:', decoded);
    } catch (err) {
      console.log('Error decoding:', err.message);
    }
  } 
  else {
    console.log('Unknown command. Use "encode: <text>" or "decode: <ids comma separated>" or "exit"');
  }

  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
