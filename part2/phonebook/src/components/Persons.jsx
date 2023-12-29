
const Person = ({person}) => {
    return (
      <div>{person.name} {person.number}</div>
    )
}

const Persons = ({persons, search}) => {
    return(
        <div>
        {persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(person => 
          <Person key={person.id} person={person} />
        )}
      </div>
    )
}

export default Persons