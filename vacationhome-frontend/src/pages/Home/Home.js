import React from 'react'
import { Link } from 'react-router-dom'
import Hero from 'components/Hero/Hero'
import FeaturedApartments from 'components/FeaturedApartments/FeaturedApartments'
import Title from 'components/Title/Title'
import ReviewsSection from 'components/ReviewSection/ReviewsSection'

export default function Home() {
    return (
        <>
            <Hero>
                <Link to="/apartments" className="btn--primary ">
                    APARTMENT
                </Link>
            </Hero>
            <FeaturedApartments />
            <MapSection />
            <ReviewsSection />
        </>
    )
}

const MapSection = () => (
    <div className="maps--container">
        <Title title="Location information" />
        <iframe
            width="600"
            height="450"
            frameBorder="0"
            title="home-google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.8056335945616!2d7.220488215727086!3d50.33287737945927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be5ba7d0c092a1%3A0x964f96b779a765ad!2sAn%20der%20Bleiche%2C%2056727%20Mayen%2C%20Duitsland!5e0!3m2!1snl!2snl!4v1612106416181!5m2!1snl!2snl"
        ></iframe>
    </div>
)



