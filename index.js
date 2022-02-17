var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/note')
const url =
  `mongodb+srv://saunojat:268qmwne@cluster0.iphf9.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

//const Person = mongoose.model('Person', personSchema)

  var app = express()

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(express.static('build'))
app.use(cors())
app.use(express.json()) // Jos tätä riviä ei ole tai on kommattuna niin "Cannot read property 'name' of undefined" jonka johdannaiset johtaa _kaikki_ express-kansioihin, pl. 1 morgan-kansio
app.use(morgan('combined', { stream: accessLogStream }))


let people = [
    
            {
              "name": "Arto Hellas",
              "number": "040-123456",
              "id": 1
            },
            {
              "name": "Ada Lovelace",
              "number": "39-44-5323523",
              "id": 2
            },
            {
              "name": "Dan Abramov",
              "number": "12-43-234345",
              "id": 3
            },
            {
              "name": "Mary Poppendieck",
              "number": "39-23-6423122",
              "id": 4
            },
]

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000)
  return randomId
}


app.post('/api/people', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(person => person.id !== id)

  response.status(204).end()
})
// Jos people taulukko on väärin niin REST client ja POSTMAN palauttavat errorin, 
// että cannot delete, kun painan Send request vscodessa tai Delete Postmanissa

app.get('/api/people/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/', (req, res) => {
    res.send('<h1>Hei maailma!</h1>')
  })
  
  app.get('/api/people', (request, response) => {
    Person.find({}).then(people => {
      response.json(people)
    })
  })

  app.get('/api/info', (req, res) => {
    res.send('Phonebook has info for ' + people.length + ' people' + '<br><br>' + Date()) //Huom. Vain lainausmerkkien sisällä oleva res.send(sisältö) <- sisältö on HTML:ää, eli en voi laittaa p-tägejä koko res.send(sisältö) <-sisällön ympärille.
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
