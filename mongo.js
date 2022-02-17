const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://saunojat:268qmwne@cluster0.iphf9.mongodb.net/phonebook?retryWrites=true&w=majority`
//Katso että ${password} eikä <password>! Jos Authentication failed yhä niin koita luoda yhteys uudestaan 
//Mongon sivuilta Databases -> Connect, kuten 3b ohjeessa kerrotaan
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)
if(process.argv.length < 4) {
    console.log("phonebook: ")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})
console.log("argv3: ", process.argv[3], " argv4: ", process.argv[4])

person.save().then(result => {
  console.log('Added ', result.name, 'number ', result.number, 'to the phonebook')
  mongoose.connection.close()
})
}