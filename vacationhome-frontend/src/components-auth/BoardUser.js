import React, {Component} from "react";
import axios from 'axios';
import UserService from "../services/user.service";
import Title from "../components/Title";
import StarRatingComponent from 'react-star-rating-component';
import AuthService from "../services/auth.service";
import '../App.css';
import {ProgressBar} from "react-bootstrap";


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
            progress: 0

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
        console.log(event);
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
    }


    //post the image to upload
    fileUploadHandler = () => {

        const fd = new FormData();

        //giving a key called file
        fd.append('file', this.state.selectedFile, this.state.selectedFile.name);

        axios.post('/upload', fd, {

            onUploadProgress: (progressEvent) => {
                let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                this.setState({progress});
            }


        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }


    render() {
        const {rating} = this.state;

        return (
            <div className="container-review">
                <Title title="Review"/>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label class="col-md-3 control-label" for="message">Review</label>

                        <div class="container-review-textbox">
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

                    <div className="form-group">
                            <label class="col-md-3 control-label" for="message">Your rating</label>
                            <p><StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            /></p>
                            <label className="col-md-3 control-label" htmlFor="message">If you want leave a picture for
                                us!</label>

                        <div className="form-uploadimage">
                            <input type="file" onChange={this.fileSelectedHandler}/>
                            <button onClick={this.fileUploadHandler}>Upload</button>
                            <div className="uploadimage-progress">
                                <ProgressBar animated now={this.state.progress} label={`${this.state.progress}% `}/>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block" onSubmit="submit">Add</button>
                    </div>

                </form>
            </div>
        );
    }
}
