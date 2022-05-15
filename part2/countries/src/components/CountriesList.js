import React from 'react'





const CountriesList = ({ countriesList }) => {

    return (
        <ul>
            {countriesList.map(country => <li key={country.name.official}>{country.name.common}</li>)}
        </ul>
    )
}


export default CountriesList