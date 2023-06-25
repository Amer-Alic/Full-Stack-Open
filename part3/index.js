const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/Person');

app.use(express.json());
morgan.token('body', (request) => JSON.stringify(request.body));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'));

function generateId() {
  let id = Math.random() * 9819 + 1;
}

app.get('/', (req, res) => {
  console.log('I am here');
  res.send('aa');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
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
  let people;
  Person.find({}).then((persons) => (people = persons));

  // const personExists = people.includes(req.body.name);

  // if (!req.body || personExists || !req.body.name || !req.body.number) {
  //   return res.status(400).json({ error: 'something is missing' });
  // }

  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  newPerson.save().then((person) => res.json(person));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('wokring');
});
