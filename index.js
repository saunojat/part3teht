const express = require('express')
const app = express()

app.use(express.json())

let notes = [  
{    
id: 1,    
content: "HTML is easy",    
date: "2020-01-10T17:30:31.098Z",    
important: true  },  
{
id: 2,    
content: "Browser can execute only Javascript",    
date: "2020-01-10T18:39:34.091Z",    
important: false  },  
{    
id: 3,    
content: "GET and POST are the most important methods of HTTP protocol",    
date: "2020-01-10T19:20:14.298Z",    
important: true  
}
]

// const app = http.createServer((request, response) => {  
//     response.writeHead(200, { 'Content-Type': 'application/json' })  
// response.end(JSON.stringify(notes))})

app.get('/', (req, res) => {
  console.log("Get got executed")
    res.send('<h1>Hello World!</h1>\nhowdihou')
  })

  app.post('/api/notes', (request, response) => {
    console.log("Post got exekjuted")
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id)) 
      : 0
  
    const note = request.body
    note.id = maxId + 1
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  app.delete('/api/notes/:id', (request, response) => {
    console.log("Delete got executed")
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  app.get('/api/notes/:id', (request, response) => {
    console.log("Get2 got executed")
      //console.log("pyyntö: ", request, "palvelimen vastaus: ", response)    
    const id = Number(request.params.id)
    const note = notes.find(note => {
      //console.log(note.id, typeof note.id, id, typeof id, note.id === id)
      return note.id === id
    })
    if (note) {    
        response.json(note)  
    } else {    
        response.status(404).end()  
    }}
    )

  app.get('/api/notes', (req, res) => {
    console.log("Get3 got executed")
    res.json(notes)
  })
  
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })