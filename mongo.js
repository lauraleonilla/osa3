const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-d6nff.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length === 3) {
  return Contact.find({}).then(result => {
    console.log('Puhelinluettelo:')
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
  })
}

contact.save().then(response => {
  console.log(
    `Lisätään ${process.argv[3]} numero ${process.argv[4]} luetteloon`
  )
  mongoose.connection.close()
})
