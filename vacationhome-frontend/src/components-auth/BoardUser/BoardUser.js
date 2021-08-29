import React from 'react'
import { useState } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { Line } from 'rc-progress'

import Title from 'components/Title/Title'
import AuthService from 'services/auth.service'
import API from 'services/api'

export default function BoardUser() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [rating, setRating] = useState()
    const [comment, setComment] = useState('')
    const [progress, setProgress] = useState(0)

    //post comment & rating to database
    const handleReviewSubmit = async (event) => {
        event.preventDefault()
        const { username } = AuthService.getUserFromLocalStorage()

        try {
            await API.post('/review', {
                comment,
                rating: rating || 5,
                userName: username,
            })
            setComment('')
            setRating()
            alert('Your review has been successfully placed!')
        } catch (error) {
            console.log(error)
        }
    }

    //post the image to upload
    const handleFileUpload = async () => {
        const fd = new FormData()
        fd.append('file', selectedFile, selectedFile.name)

        try {
            await API.post('/review/upload', fd, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                    setProgress(progress)
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="review">
            <Title className="review__title" title="Review" />

            <div className="review__container">
                <form
                    data-testid="review-form"
                    className="review__form"
                    onSubmit={handleReviewSubmit}
                >
                    <div className="review__form--group">
                        <label className="review__formLabel" htmlFor="comment">
                            Your Review
                        </label>
                        <div className="review__textContainer">
              <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  placeholder="Please enter your review about your stay here..."
                  rows="5"
                  value={comment}
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
              ></textarea>
                        </div>
                    </div>

                    <div className="review__form--group">
                        <label className="review__label--star" htmlFor="rating">
                            Your rating
                        </label>
                        <p>
                            <StarRatingComponent
                                name="rating"
                                id="rating"
                                starCount={5}
                                value={rating}
                                onStarClick={(value) => setRating(value)}
                            />
                        </p>

                        <label className="review__label--message" htmlFor="message">
                            If you want leave a picture for us!
                        </label>
                        <div className="review__imageUploader">
                            <input
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                            <button className="btn btn--primary" onClick={handleFileUpload}>
                                Upload
                            </button>
                            <div className="review__imageProgress">
                                <Line percent={progress} label={`${progress}% `} />
                            </div>
                        </div>
                        <button className="btn btn--primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
