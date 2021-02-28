import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';
import PropTypes from 'prop-types';


export default function Room({room}) {
    //destructure room
    const {name, slug, image} = room;


    return (
        <article className="room">
            <div className="img-container">
                <img src={image[0] || defaultImg} alt="single-room"/>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">Features</Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    )
}

Room.propTypes = {
    //check wether this particular prop has the property name
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
}
