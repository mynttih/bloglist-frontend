import React from 'react';

const Notification = (props) => {
    const error = props.error
    const message = props.message
    if (message !== null) {
        return (
            <div className="message">
                {message}
            </div>
        )
    } else if (error !== null) {
        return (
            <div className="error">
                {error}
            </div>
        )
    } else {
        return null
    }
}

export default Notification