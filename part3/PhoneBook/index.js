require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Entry = require('./models/entires')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const date = new Date()

app.get('/api/info', (request, response) => {
    response.send(`<div>
                Phonebook has info for ${persons.length} people
            </div>
            <div>
                ${date.toDateString()}
            </div>`)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(person => person.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    console.log(request.params.id)
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(202).end()
})
app.post('/api/persons', (request, response) => {
    id = Math.round((2 ** 32 - 1) * Math.random())
    const name = request.body.name
    const number = request.body.number
    if (!name || !number) {
        console.log(name, number)
        return response.status(404).send('Data not in correct format.')
    }
    const newPerson = { id: id, name: name, number: request.body.number }
    persons.push(newPerson)
    response.status(200).send({ 'person': newPerson, 'msg': 'Data has been added to the server' })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})