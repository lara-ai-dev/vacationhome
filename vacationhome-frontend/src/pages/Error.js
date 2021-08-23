import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner/Banner';
import {Link} from 'react-router-dom';


// Error site for wrong urls
function Error() {
    return (
        <Hero>
            <Banner title="404" subtitle="page not found">
                <Link to="/" className="btn btn--primary">
                    return home
                </Link>
            </Banner>
        </Hero>
    )
}

export default Error
