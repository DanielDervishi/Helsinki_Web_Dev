import React from 'react'




const CountriesList = ({ countriesList, clickHandler }) => {

    return (
        <ul>
            {countriesList.map(country => <li key={country.name.official}>
                {country.name.common}
                <input type="button" value="show" onClick={() => clickHandler(country.name.official)} />
            </li>)}

        </ul>
    )
}


export default CountriesList