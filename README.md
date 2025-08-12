# Simple Custom Tokenizer (Node.js)

This project is a simple tokenizer built in Node.js that:

- Learns vocabulary from example sentences
- Converts text to token IDs (encode)
- Converts token IDs back to text (decode)
- Handles special tokens like `[PAD]`, `[UNK]`, `[CLS]`, and `[SEP]`


## File Details

### `tokenizer.js`

Contains the `SimpleTokenizer` class which:

- Builds a vocabulary from input sentences
- Tokenizes text into words
- Encodes words to IDs and decodes IDs back to words
- Uses special tokens to handle unknown or padding cases


#### Special Tokens in the Tokenizer

Special tokens are predefined tokens used for specific purposes in natural language processing. My tokenizer uses these four:

| Token   | ID  | Purpose                                                    |
|---------|-----|------------------------------------------------------------|
| `[PAD]` | 0   | Padding token — used to fill empty spaces in sequences so they have equal length |
| `[UNK]` | 1   | Unknown token — represents any word not in the vocabulary (unknown or new words) |
| `[CLS]` | 2   | Classification token — usually added at the start of a sentence to help models understand the context |
| `[SEP]` | 3   | Separator token — used to separate two sentences or parts of text |

---

## Why are special tokens important?

- **Handling unknown words:** `[UNK]` helps the tokenizer gracefully deal with words it hasn’t seen before.
- **Uniform sequence length:** `[PAD]` fills shorter sequences so you can process multiple inputs in parallel.
- **Marking sentence boundaries:** `[CLS]` and `[SEP]` are useful for tasks like classification or question answering where the model needs to understand sentence structure.

---

## How are they used in your tokenizer?

- They get fixed IDs at the start (`0` to `3`) before your tokenizer learns other words.
- When encoding, if a word is not in the vocab, it gets replaced with `[UNK]` (ID 1).
- `[PAD]` can be added later if you want to pad sequences to the same length.
- `[CLS]` and `[SEP]` can be manually added to input text if you want to prepare data for specific tasks.

---

If you want, I can help you extend your tokenizer to automatically insert these special tokens where needed!


---

### `sentences.json`

A JSON file containing an array of example sentences. The tokenizer learns its vocabulary from these sentences.

You can update this file to include more or different sentences to expand the vocabulary.

---

### `vocab.json`

A JSON file containing trained vocabulary generated from sentences as well as conversation made with the cli. It is getting constantly updated if any new words is detected and its frequency is more then the minimum frequency threshold

---

### `index.js`

A script demonstrating how to:

- Load existing vocab from `vocab.json`
- Load sentences from `sentences.json`
- Load conversations from `conversation.json`
- Build the tokenizer vocabulary
- Save the vocab
- Print the vocabulary learned

To run this script:

```bash
node index.js
```

---

### `cli.js`

A cli script demonstrating how to:

- Load existing vocab from `vocab.json`
- Load conversations from `conversation.json`
- Encode text using command "encode:"
- Decode text using command "decode:"

To run this script:

```bash
node train.js

Tokenizer CLI ready.
Enter "encode: <text>" or "decode: <ids comma separated>" or "exit":
encode: yup man
Encoded: [ 203, 204 ]
decode: yup man


#When new word given that is not in vocab
Enter "encode: <text>" or "decode: <ids comma separated>" or "exit":
> encode: new thing
Detected new word - [new]
Saving to vocab
Detected new word - [thing]
Saving to vocab
Encoded: [ 206, 207 ]