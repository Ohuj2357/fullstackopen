
const Person = ({person, deletePerson, setPersons, persons}) => {
    const personDelete = () =>{
      if (confirm(`Delete ${person.name}`)){
        deletePerson(person.id).then(()=> setPersons(persons.filter(p => p.id !== person.id))).catch(error => {})
      }
    }
    return (
      <div>
        {person.name} {person.number} <button onClick={personDelete}>delete</button>
      </div>
    )
}

const Persons = ({persons, search, deletePerson, setPersons}) => {
    return(
        <div>
        {persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(person => 
          <Person key={person.id} person={person} deletePerson = {deletePerson} setPersons = {setPersons} persons = {persons}/>
        )}
      </div>
    )
}

export default Persons