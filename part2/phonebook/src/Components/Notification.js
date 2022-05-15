import React from 'react'
import '../styles.css'
const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}




export default Notification