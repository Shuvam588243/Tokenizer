const fs = require('fs');
const readline = require('readline');
const SimpleTokenizer = require('./tokenizer');

const tokenizer = new SimpleTokenizer();

const rawData = fs.readFileSync('sentences.json', 'utf8');
const sentences = JSON.parse(rawData);

tokenizer.train(sentences);

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
    rl.close();
    return;
  }

  const [command, ...rest] = line.split(' ');
  const arg = rest.join(' ');

  if (command === 'encode:') {
    const encoded = tokenizer.encode(arg);
    console.log('Encoded:', encoded);
  } else if (command === 'decode:') {
    try {
      const ids = arg.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      const decoded = tokenizer.decode(ids);
      console.log('Decoded:', decoded);
    } catch (err) {
      console.log('Error decoding:', err.message);
    }
  } else {
    console.log('Unknown command. Use "encode <text>" or "decode <ids comma separated>" or "exit"');
  }

  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
