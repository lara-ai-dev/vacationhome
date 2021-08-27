import React from 'react'

const InputField = React.forwardRef(
    ({ onChange, onBlur, name, label, type = 'text', ...props }, ref) => (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                type={type}
                id={name}
                className="form-control"
                {...props}
            />
        </div>
    )
)

export default InputField
