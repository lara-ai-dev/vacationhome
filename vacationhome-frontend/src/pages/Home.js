import React, {useState, useEffect, useCallback} from "react";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import FeaturedRooms from '../components/FeaturedRooms';
import Title from "../components/Title";
import UserService from '../services/user.service';
import axios from 'axios';
import '../App.css';
import StarRatingComponent from 'react-star-rating-component';


export default function Home() {

    const [content, setContent] = useState("");
    const [reviews, setReviews] = useState([]);
    const [files, setFiles] = useState([]);

    //can be seen for everyone
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

    //get reviews from database
    const loadReviews = useCallback(() => {
        axios.get(`/review`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    //get uploaded images from database
    const loadImages = useCallback(() => {
        axios.get(`/files`)
            .then((response) => {

                setFiles(response.data);
            })
            .catch(err => {
                console.log(err)})
    }, [])

    //the reviews & images are loaded initially
    useEffect(() => {
        loadReviews();
        loadImages()
    }, [loadReviews, loadImages])

    return (
        <>

            <Hero>

                    <Link to="/rooms" className="btn-primary ">
                        APARTMENT
                    </Link>

            </Hero>

            <FeaturedRooms/>

            <div className="container-maps">
                <Title title="Location information"/>
                <iframe
                    width="600" height="450" frameborder="0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.8056335945616!2d7.220488215727086!3d50.33287737945927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be5ba7d0c092a1%3A0x964f96b779a765ad!2sAn%20der%20Bleiche%2C%2056727%20Mayen%2C%20Duitsland!5e0!3m2!1snl!2snl!4v1612106416181!5m2!1snl!2snl"
                ></iframe>
            </div>
            <div className="container-review">
                <Title title="Reviews"/>
                <div className="reviewitem-container">
                    <ul>
                        {reviews.map((item, i) => (
                            <li key={i} className="reviewitem-container-information">
                                <p className="reviewitem-username">{item.userName}</p>
                                <p className="reviewitem-comment">"{item.comment}"</p>
                                <p className="reviewitem-rating"><StarRatingComponent value={item.rating}/></p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="imageitem-container">
                    <ul>
                        {files.map((item, i) => (
                            <li key={i} className="imageitem-container-information">
                                <p className="imageitem-filename">{item.fileName}</p>
                                <img src={item.fileName}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>


    )
}
