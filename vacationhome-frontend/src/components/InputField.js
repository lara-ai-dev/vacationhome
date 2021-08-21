import React, {useState} from 'react';

const InputField = ({ label, type, ...props }) => (
    <div className="form-group">
        {label && <label htmlFor="input-field">{label}</label>}
        <input type={type} {...props} />
    </div>
)

export default InputField
