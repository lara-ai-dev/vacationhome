import React, {useState, useEffect, useCallback} from "react";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import Title from "../components/Title";
import UserService from '../services/user.service';
import axios from 'axios';
import '../App.css';
import StarRatingComponent from 'react-star-rating-component';


export default function Home() {

    const [content, setContent] = useState("");
    const [reviews, setReviews]  = useState([]);

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

    const loadReviews = useCallback(() => {
        axios.get(`/review`)
            .then((response) => {
                setReviews(response.data);
            })
    }, []);

    //the reviews are loaded initially
    useEffect(() => {
        loadReviews();
    }, [loadReviews])

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

            <div className="container-maps">
                <Title title="Location information"/>
                <iframe
                    width="600" height="450" frameborder="0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.8056335945616!2d7.220488215727086!3d50.33287737945927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be5ba7d0c092a1%3A0x964f96b779a765ad!2sAn%20der%20Bleiche%2C%2056727%20Mayen%2C%20Duitsland!5e0!3m2!1snl!2snl!4v1612106416181!5m2!1snl!2snl"
                    ></iframe>
            </div>
            <div className="container-reviews">
                <Title title="Reviews"/>
        <div className="reviewitem-container">
            <ul>
                {reviews.map((item,i) => (
                    <li key={i} className="reviewitem-container-information">
                        <p className="reviewitem-username">{item.userName}</p>
                        <p className="reviewitem-comment">"{item.comment}"</p>
                        <p className="reviewitem-rating"><StarRatingComponent value={item.rating}/></p>
                    </li>
                ))}
            </ul>
        </div>
            </div>
        </>


    )
}
