import axios from 'axios'


const addPersonToServer = (setPersons, setNewName, setNewNumber, persons, obj) => {
    axios.post('http://localhost:3001/persons', obj).then(promise => {
        setPersons(persons.concat(promise.data))
        setNewName('')
        setNewNumber('')
    })
}
const getData = (setPersons) => {
    axios.get('http://localhost:3001/persons').then(promise => { setPersons(promise.data) })
}
const deletePersonBackend = (id, setErrorMessage, setNotificationClassName) => {
    console.log(id)
    axios.delete('http://localhost:3001/persons/' + id).catch(() => {
        setErrorMessage(`'${id}' was already removed from server`);
        setNotificationClassName("deletionError")
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000)
    }
    )
}
const updateNumberBackend = (name, data) => {
    axios.put('http://localhost:3001/persons/' + name, data)
}
export { addPersonToServer, getData, deletePersonBackend, updateNumberBackend };