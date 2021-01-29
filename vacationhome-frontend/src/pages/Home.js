import React, { useState, useEffect } from "react";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

import UserService from '../services/user.service';

export default function Home() {

    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <>

        <Hero >
            <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
            <Link to="/rooms" className="btn-primary">
                our rooms
            </Link>
            </Banner>


        </Hero>
        <Services/>
        <FeaturedRooms/>
        
        </>


    )
}
