import { useState, useEffect } from 'react'
import personService from './services/personsS'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personx = persons.find(p => p.name === newName)
    if (personx!==undefined){
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changedPerson = { ...personx, number: newNumber }
        personService.update(personx.id, changedPerson).then(response => {
          setPersons(persons.map(p => p.id !== personx.id ? p : response.data))
        })
      }
    }else{
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson = {searchPerson} handler = {handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm name = {newName} number = {newNumber} 
      nameHandler = {handleNameChange} numberHandler = {handleNumberChange} addPerson = {addPerson}/>
      
      <h2>Numbers</h2>
      <Persons persons = {persons} search = {searchPerson} deletePerson = {personService.deletePerson} setPersons = {setPersons}/>
    </div>
  )
}

export default App
