import React, {Component} from "react";
import axios from 'axios';
import UserService from "../services/user.service";
import Title from "../components/Title";
import StarRatingComponent from 'react-star-rating-component';
import AuthService from "../services/auth.service";
import '../App.scss';
//import {ProgressBar} from "react-bootstrap";
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
                                class="form-control"
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
}
