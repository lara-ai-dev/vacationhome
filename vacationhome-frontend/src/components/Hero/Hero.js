/*import React from 'react'

export default function Hero({children,hero}) {
    return (
        //classname equals to my hero prop
        <header className={hero}>  {children} </header>

    )
}

//hero prop will be by default the defaulthero 
Hero.defaultProps={
    hero: "defaultHero"
}*/
export default function Hero({ className = 'defaultHero', ...props }) {
    return <header data-testid="hero" className={className} {...props} />
}



