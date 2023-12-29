const Filter = ({searchPerson, handler}) => {
    return(
        <div>
            filter shown with <input value = {searchPerson} onChange = {handler}/>
        </div>
        
    )
}

export default Filter