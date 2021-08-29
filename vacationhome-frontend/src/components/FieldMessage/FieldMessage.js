import React from 'react'

const FieldMessage = ({ name, errors }) => {
    if (!errors[name]) return null

    let message = errors[name].message || 'Invalid value'
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    )
}

export default FieldMessage
