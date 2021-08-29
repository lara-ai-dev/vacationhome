import React from 'react';
import Hero from '../../components/Hero/Hero';
import {Link} from 'react-router-dom';
import FilteredApartmentsContainer from '../../components/FilteredApartmentsContainer/FilteredApartmentsContainer';

export default function Apartments() {
    return (
        <>
       <Hero hero="roomsHero">
               <Link to="/" className="btn btn--primary">
                   RETURN HOME
               </Link>
       </Hero>
       <FilteredApartmentsContainer/>
       </>
    )
}
