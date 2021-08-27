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
            await API.post('/upload', fd, {
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



/*import React, {Component} from "react";
import axios from 'axios';
import UserService from "../../services/user.service";
import Title from "../../components/Title/Title";
import StarRatingComponent from 'react-star-rating-component';
import AuthService from "../../services/auth.service";
import '../../App.scss';
import { Line, Circle } from 'rc-progress';

export default class BoardUser extends Component {
    constructor(props) {
        super(props);


        this.state = {
            content: "",
            selectedFile: null,
            rating: 1,
            comment: "",
            currentUser: undefined,
            fileName: "",
            progress: 0,
            successful: false

        };
    }




    //get user board - review
    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    //get rating (stars)
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    //detects if the value - comment input changes
    onChangeComment = event => {
        this.setState({
            comment: event.target.value
        })
    }

    //select file to upload
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    //post comment & rating to database
    handleSubmit = event => {
        event.preventDefault();
        const currentUser = AuthService.getCurrentUser();

        axios.post('/review', {
            comment: this.state.comment,
            rating: this.state.rating,
            userName: currentUser.username
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        this.setState({
            successful: true
        })
        alert("Your review has been successfully placed!");
    }


    //post the image to upload
    fileUploadHandler = () => {

        const fd = new FormData();

        //giving a key called file
        fd.append('file', this.state.selectedFile, this.state.selectedFile.name);

        axios.post('/upload', fd, {

            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                this.setState({progress});
            }

        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        const {rating} = this.state;

        return (
            <div className="review">
                <Title className="review__title" title="Review"/>

                <div className="review__container">
                <form className="review__form" onSubmit={this.handleSubmit}  success={this.state.formSuccess} error={this.state.formError}>
                    <div className="review__form--group">
                        <label className="review__formLabel" for="message">Your Review</label>
                        <div className="review__textContainer">
                            <textarea
                                class="form--control"
                                id="comment"
                                name="comment"
                                placeholder="Please enter your review about your stay here..."
                                rows="5"
                                value={this.state.comment}
                                type="text"
                                onChange={this.onChangeComment}>
                            </textarea>
                        </div>
                    </div>

                    <div className="review__form--group">
                            <label class="review__label--star" for="message">Your rating</label>
                            <p><StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            /></p>
                            <label className="review__label--message" htmlFor="message">If you want leave a picture for
                                us!</label>

                        <div className="review__imageUploader">
                            <input type="file" onChange={this.fileSelectedHandler}/>
                            <button className="btn btn--primary" onClick={this.fileUploadHandler}>Upload</button>
                            <div className="review__imageProgress">
                                <Line percent={this.state.progress}label={`${this.state.progress}% `}/>
                            </div>
                        </div>
                        <button className="btn btn--primary" onSubmit="submit">Submit</button>

                    </div>

                </form>
                </div>
            </div>
        );
    }
}*/
