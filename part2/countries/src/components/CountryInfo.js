import React from 'react'


const CountryInfo = ({ countriesList, formatList }) => {
    console.log(countriesList[0].flags['png'])
    return (<div>
        <h1>{countriesList[0].name.common}</h1>
        <div>capital {countriesList[0].capital[0]}</div>
        <div>area {countriesList[0].area}</div>
        <h3>languages</h3>
        <ul>
            {formatList()}
        </ul>
        <img src={countriesList[0].flags['svg']} alt={""} />
    </div>
    )
}

export default CountryInfo;