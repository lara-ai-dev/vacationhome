import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


export default function Apartment({name, slug, image}) {

    return (
        <article data-testid="apartment" className="apartment">
            <div className="apartment__image">
                <img src={image} alt="single-apartment"/>
                <Link to={`/apartments/${slug}`} className="btn btn--primary apartment__link">Features</Link>
            </div>
            <p className="apartment--info">{name}</p>
        </article>
    )
}

Apartment.propTypes = {
    //check wether this particular prop has the property name
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }),
}
