import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase())>-1){
      alert(`${newName} is already added to phonebook`)
    }else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <Persons persons = {persons} search = {searchPerson} />
    </div>
  )
}

export default App
