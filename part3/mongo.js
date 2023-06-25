const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Add password to the command');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Amer:${password}@cluster0.iw19u9k.mongodb.net/People?retryWrites=true&w=majorityL`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log(`phonebook:`);
    for (let person of persons) {
      console.log(person.name, person.number);
    }
    mongoose.connection.close();
  });
  return;
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then(() => {
  console.log(`Added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});
