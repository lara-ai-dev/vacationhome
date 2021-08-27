import { useState, useEffect } from 'react'
import StarRatingComponent from 'react-star-rating-component'

import Title from 'components/Title/Title'
import API from 'services/api'

export default function ReviewsSection() {
    const [reviews, setReviews] = useState([])
    const [files, setFiles] = useState([])

    //the reviews & images are loaded initially
    useEffect(() => {
        //get reviews from database
        function loadReviews() {
            API.get(`/review`)
                .then((response) => {
                    setReviews(response.data)
                })
                .catch((err) => {})
        }

        //get uploaded images from database
        function loadImages() {
            API.get(`/files`)
                .then((response) => {
                    setFiles(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        loadReviews()
        loadImages()
    }, [])

    return (
        <div data-testid="reviews-section" className="review__container">
            <Title title="Reviews" />
            <ReviewList reviews={reviews} />

            <div className="review__image--container">
                <ul>
                    {files.map((item, i) => (
                        <li key={i} className="review__item--information">
                            <p className="imageitem-filename">{item.fileName}</p>
                            <img src={item.fileName} alt="" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const ReviewList = ({ reviews }) => (
    <div className="reviewitem-container">
        <ul>
            {reviews.map((item, i) => (
                <ReviewItem key={i} {...item} />
            ))}
        </ul>
    </div>
)

const ReviewItem = ({ userName, comment, rating }) => (
    <li data-testid="review-item" className="review__container">
        <p className="review__item--username">{userName}</p>
        <p className="review__item--comment">"{comment}"</p>
        <p className="review__item--rating">
            <StarRatingComponent name="rating" value={rating} />
        </p>
    </li>
)
