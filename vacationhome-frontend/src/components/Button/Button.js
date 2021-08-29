import React from 'react';
import '../../styles/_button.scss';


const Button = ({ children, ...props }) => {
    return (
        <button className="btn btn--registration" {...props}>
            {children || 'label'}
        </button>
    )
}

export default Button