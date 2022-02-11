var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const cors = require('cors')

var app = express()

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(cors())
app.use(express.json()) // Jos tätä riviä ei ole tai on kommattuna niin "Cannot read property 'name' of undefined" jonka johdannaiset johtaa _kaikki_ express-kansioihin, pl. 1 morgan-kansio
app.use(morgan('combined', { stream: accessLogStream }))


let persons = [
    
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


app.post('/api/persons', (request, response) => {  
  const body = request.body 
  console.log("body name: ", body.name) 

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
    console.log("error name or number: ", error) 
    
  } else if ((persons.map(person => person.name).indexOf(body.name)) > -1){
    return response.status(400).json({
      error: 'name already exists in phonebook'
    })
    console.log("error name already exists", error)
  }  
  console.log("map ja indexof: ", (persons.map(person => person.name).indexOf(body.name)))
  // En oo varma minkä luvun indexOf saa jos nimi löytyy jo listasta, mutta ykkönen se ei tuntunu olevan (=== 1 ei toiminu)
  // En tiedä miten console.loggaisin asian, kun console.logit if-lauseen sisällä ei näy. Mut ainaki se arvo on > -1.
  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
// Jos persons taulukko on väärin niin REST client ja POSTMAN palauttavat errorin, 
// että cannot delete, kun painan Send request vscodessa tai Delete Postmanissa

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  console.log("person id: ", person.id, "id: ", id) // person.id = id pätee vain jos person on 
  // olemassa kokeillussa täsmäosoitteessa. Vain silloin tulostaa map resurssiolion.
  // Eli muussa tapauksessa if-vaihtoehto ei toteudu ja else-vaihtoehto (404 error) toteutuu.
  console.log(person)
  // response.json(person)
  
  if (person) {    
    response.json(person)  
  } else {
        response.status(404).end()  
      }
})

app.get('/', (req, res) => {
    res.send('<h1>Hei maailma!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/info', (req, res) => {
    res.send('Phonebook has info for ' + persons.length + ' persons' + '<br><br>' + Date()) //Huom. Vain lainausmerkkien sisällä oleva res.send(sisältö) <- sisältö on HTML:ää, eli en voi laittaa p-tägejä koko res.send(sisältö) <-sisällön ympärille.
  })

const PORT = process.env.port || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
