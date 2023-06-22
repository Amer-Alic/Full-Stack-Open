const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
morgan.token('body', (request) => JSON.stringify(request.body));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'));

let entries = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

function generateId() {
  let id = Math.random() * 9819 + 1;
}

app.get('/', (req, res) => {
  console.log('I am here');
  res.send('aa');
});

app.get('/api/persons', (req, res) => {
  res.json(entries);
});

app.get('/info', (req, res) => {
  const numEntries = entries.length;
  res.send(`<p>Phonebook has info for ${numEntries} people </p> <p> ${new Date()}`);
});

app.get('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id);
  const entrie = entries.find((entrie) => entrie.id === personId);

  if (entrie) {
    res.json(entrie);
  } else {
    res.status(404).send('NOT FOUND');
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id);
  entries = entries.filter((entrie) => entrie.id !== personId);

  res.status(204).end();
});

const postmorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body');

app.post('/api/persons', postmorgan, (req, res) => {
  const entrieNames = entries.map((e) => e.name);
  const nameExists = entrieNames.includes(req.body.name);

  if (!req.body || nameExists || !req.body.name || !req.body.number) {
    return res.status(400).json({ error: 'something is missing' });
  }

  const entrie = {
    id: generateId(),
    name: req.body.name,
    number: req.body.number,
  };

  entries = entries.concat(entrie);
  res.json(entrie);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('wokring');
});
