import React from 'react'

export default function Hero({ className = 'defaultHero', ...props }) {
    return <header data-testid="hero" className={className} {...props} />
}



