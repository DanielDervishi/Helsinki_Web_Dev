import React from 'react'
import '../styles.css'
const Notification = ({ message, className }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className={className}>
                {message}
            </div>
        )
    }
}




export default Notification