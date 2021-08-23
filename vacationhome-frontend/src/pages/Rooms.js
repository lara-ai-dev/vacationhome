import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner/Banner';
import {Link} from 'react-router-dom';
import RoomContainer from '../components/RoomContainer';

export default function Rooms() {
    return (
        <>
       <Hero hero="roomsHero">
               <Link to="/" className="btn btn--primary">
                   RETURN HOME
               </Link>
       </Hero>
       <RoomContainer></RoomContainer>
       </>
    )
}
