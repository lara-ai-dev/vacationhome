import React from 'react';
import '../../styles/_button.scss';

const Button = ({ children, onClick, btnColor = 'teal', labelColor, disabled, type, style, ...props }) => {
    return (
        <button className="btn btn--registration" onClick={props.handleClick}>
            {children || 'label'}
        </button>
    );
};

export default Button;
