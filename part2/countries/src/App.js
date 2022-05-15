import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'
import CountriesInfo from './components/CountryInfo'


function App() {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [searchPrefixCountries, setSearchPrefixCountries] = useState([])
  const [clickedShow, setClickedShow] = useState(false)

  const clickHandler = (id) => {
    setClickedShow(true)
    setSearchPrefixCountries(searchPrefixCountries.filter(country => country.name.official === id))
  }

  const handleDisplay = () => {
    if ((1 < searchPrefixCountries.length && searchPrefixCountries.length <= 10) || searchPrefixCountries.length === 0) {
      if (clickedShow === false) {
        return (
          <CountriesList countriesList={searchPrefixCountries} clickHandler={clickHandler} />
        )
      } else {
        return (<CountriesInfo countriesList={searchPrefixCountries} formatList={formatLanguages} />)
      }
    } else if (searchPrefixCountries.length === 1) {
      return (
        <CountriesInfo countriesList={searchPrefixCountries} formatList={formatLanguages} />
      )
    } else {
      return (<div>Too many matches, specify another filter</div>)
    }
  }
  const effectCallback = () => {
    axios.get("https://restcountries.com/v3.1/all").then(promise => { setCountries(promise.data); setSearchPrefixCountries(promise.data); })
  }
  useEffect(effectCallback, [])

  const formatLanguages = () => {
    let countriesOut = []

    for (const language in searchPrefixCountries[0].languages) {
      countriesOut.push(<li key={searchPrefixCountries[0][language] + language}>{searchPrefixCountries[0].languages[language]}</li>)
    }
    return countriesOut
  }
  return (
    <>
      <div>
        find countries <input value={searchCountry} onChange={(event) => {
          setSearchCountry(event.target.value);
          setSearchPrefixCountries(countries.filter(country => country.name.common.toLowerCase().startsWith(event.target.value.toLowerCase())));
          setClickedShow(false)
        }} />
      </div>
      <div>
        {handleDisplay()}
      </div>
    </>
  )
}

export default App;
