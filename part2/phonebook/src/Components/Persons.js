import React from 'react'

const Persons = ({ createListItemsArray }) => {
    return (
        <ul>
            {createListItemsArray()}
        </ul>
    )
}


export default Persons