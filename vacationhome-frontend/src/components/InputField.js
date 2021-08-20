import React, {useState} from 'react';

const InputField = ({ value, label, name, placeholder, type, onChange}) => (

    <div className="logIn__form--group">
        {label && <label htmlFor="input-field">{label}</label> }
        <input
            type={type}
            value={value}
            name={name}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
            onInvalid={value}
        />
    </div>
);

export default InputField;