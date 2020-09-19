import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

import Notification from './components/Notification'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = () => {
    const personObject = { name: newName, number: newNumber }
    personsService.create(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNotificationMessage('New contact 🙂')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    })
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure ?')) {
      personsService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already in phonebook`)
      : addPerson()
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <Form
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} remove={deletePerson} />
    </div>
  )
}

export default App
