

const Country = ({name, setNewName, setCountryName}) => {
    return (
        <div> {name} <button onClick = {() => {
            setCountryName(name)
            setNewName(name)
        }}>show</button> </div>
        
    )
}



const Countries = ({countries, newName, setCountryName, setNewName, saa}) => {

    
    const maat = countries.map(c => c.name.common).filter(n => n.toLowerCase().includes(newName.toLowerCase()))
    if (maat.length >10){
        return (
            <div>Too many matches, specify another filter</div>
        )
    }else if (maat.length>1){
        return (
            <div>{maat.map((m, i) => <Country key = {i} name = {m} setNewName = {setNewName} setCountryName = {setCountryName}/>)}
            </div>
        )
    }else if (maat.length>0){
        const country = countries.find(m => m.name.common === maat[0])
        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <div>
                    <b>languages:</b>
                    <ul>
                        {Object.values(country.languages).map((l, i) => <li key = {i}>{l}</li>)}
                    </ul>
                </div>
                <div><img src={country.flags.png}></img></div>
                <h2>Weather in {country.capital}</h2>
                <div>temperature {(saa.temp-273.15).toFixed(2)} Celsius</div>
                <div><img src={`https://openweathermap.org/img/wn/${saa.kuva}@2x.png`}></img></div>
                <div>wind {saa.wind} m/s</div>
            </div>
        )
    }
    return(
        <div>No matches</div>
    )
    
}

export default Countries