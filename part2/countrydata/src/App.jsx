import { useState, useEffect } from 'react'
import Countries from "./components/Countries"
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [newName, setNewName] = useState("")
  const [countries, setCountries] = useState([])
  const [saa, setSaa] = useState({temp: 0, speed: 0, kuva: "10d"})
  const [countryName, setCountryName] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
        

        useEffect(() => {
            if (countryName) {
              
              const country = countries.find(m => m.name.common === countryName)
              axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
                .then(response => {
                    
                    setSaa({temp: response.data.main.temp,
                        wind: response.data.wind.speed,
                        kuva: response.data.weather[0].icon
                    })
                })
            }
        }, [countryName])



  const muutos = event => {
    
    const maat = countries.map(c => c.name.common).filter(n => n.toLowerCase().includes(event.target.value.toLowerCase()))
    const country = countries.find(m => m.name.common === maat[0])
    if(country !== undefined){
    if (country.name.common !== countryName){
      setCountryName(country.name.common)
    }
    }
    setNewName(event.target.value)
  }
  
  
  return (
    <div>
      <div>
        find countries <input
          value={newName}
          onChange={muutos}
        />
      </div>
      <Countries countries = {countries} newName = {newName} setNewName = {setNewName}
       saa = {saa} setCountryName={setCountryName} countryName = {countryName}/>
    </div>
  )
}

export default App