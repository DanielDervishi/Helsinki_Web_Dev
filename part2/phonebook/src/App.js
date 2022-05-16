import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import { addPersonToServer, getData, deletePersonBackend, updateNumberBackend } from './BackendCommunication'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPrefix, setSearchPrefix] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationClassName, setNotificationClassName] = useState("")

  const nameInList = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        return true
      }
    }
    return false
  }
  const updateNumber = (name, number) => {
    updateNumberBackend(name, { name: name, number: number, id: name })
    replacePerson(name, number)
    setErrorMessage('Added ' + name)
    setNotificationClassName("addedPerson")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const replacePerson = (name, number) => {
    const newPersons = persons.filter(person => person.name = name)
    newPersons.push({ name: name, number: number, id: name })
    setPersons(newPersons)
  }
  const updateForm = (event) => {
    event.preventDefault();
    if (!nameInList()) {
      if (!(newName.trim() === '')) {
        console.log(nameInList(), newName.trim() === '')
        addPersonToServer(setPersons, setNewName, setNewNumber, persons, { name: newName, number: newNumber, id: newName })
        setErrorMessage('Added ' + newName)
        setNotificationClassName("addedPerson")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      if (window.confirm(newName + " already exists in the phonebook. Replace number?")) {
        updateNumber(newName, newNumber)
      }
    }
  }

  const deletePerson = (id) => {
    if (window.confirm("Are you sure?")) {
      deletePersonBackend(id, setErrorMessage, setNotificationClassName)
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
    }
  }

  const createListItemsArray = () => {
    return (persons.filter(person => person.name.toLowerCase().startsWith(searchPrefix.toLowerCase())).map(person =>
      <li key={person.name + person.number}>{person.name} {person.number}
        <input type="button" onClick={() => deletePerson(person.name)} value="delete" />
      </li>
    ))
  }

  const effectCallback = () => { getData(setPersons) }
  useEffect(effectCallback, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchPrefix} onChange={(event) => setSearchPrefix(event.target.value)} />
      <PersonForm onSubmit={updateForm} valueName={newName} valueNumber={newNumber} onChangeName={(event) => setNewName(event.target.value)} onChangeNumber={(event) => setNewNumber(event.target.value)} />
      <Notification message={errorMessage} className={notificationClassName} />
      <h2>Numbers</h2>
      <Persons createListItemsArray={createListItemsArray} />
    </div>
  )
}

export default App