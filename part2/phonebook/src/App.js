import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPrefix, setSearchPrefix] = useState('')

  const nameInList = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        return true
      }
    }
    return false
  }

  const updateForm = (event) => {
    event.preventDefault();
    if (!nameInList()) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const createListItemsArray = () => {
    return (persons.filter(person => person.name.toLowerCase().startsWith(searchPrefix.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>))
  }

  const effectCallback = () => {
    axios.get('http://localhost:3001/persons').then(promise => { setPersons(promise.data) })
  }
  useEffect(effectCallback, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchPrefix} onChange={(event) => setSearchPrefix(event.target.value)} />
      <PersonForm onSubmit={updateForm} valueName={newName} valueNumber={newNumber} onChangeName={(event) => setNewName(event.target.value)} onChangeNumber={(event) => setNewNumber(event.target.value)} />
      <h2>Numbers</h2>
      <Persons createListItemsArray={createListItemsArray} />
    </div>
  )
}

export default App