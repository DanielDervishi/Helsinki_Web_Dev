import axios from 'axios'

const addPersonToServer = (setPersons, setNewName, setNewNumber, persons, obj) => {
    axios.post('/api/persons/', obj).then(promise => {
        console.log("promise data:", promise.data)
        setPersons(persons.concat(promise.data.person))
        setNewName('')
        setNewNumber('')
    })
}
const getData = (setPersons) => {
    axios.get('/api/persons/').then(promise => { setPersons(promise.data) })
}
const deletePersonBackend = (id, setErrorMessage, setNotificationClassName) => {
    console.log(id)
    axios.delete('/api/persons/' + id).catch(() => {
        setErrorMessage(`'${id}' was already removed from server`);
        setNotificationClassName("deletionError")
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000)
    }
    )
}
const updateNumberBackend = (data) => {
    axios.put('/api/persons/' + data.id, data)
}
export { addPersonToServer, getData, deletePersonBackend, updateNumberBackend };