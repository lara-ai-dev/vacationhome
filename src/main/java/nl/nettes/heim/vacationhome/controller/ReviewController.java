package nl.nettes.heim.vacationhome.controller;


import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.domain.Review;
import nl.nettes.heim.vacationhome.persistance.ReviewRepository;
import nl.nettes.heim.vacationhome.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ReviewController {

    private ReviewRepository reviewRepository;
    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping(value = "/review")
    public List<Review> getAllReviews(){
       return reviewService.getAllReviews();
    }

    @GetMapping(value = "/review/{commentId}")
    public Review getCommentById(@PathVariable long commentId){
        Optional<Review> review = reviewRepository.findById(commentId);
        return review.orElse(null);
    }
/*
    @PostMapping(value = "/review")
    public Review addReview(@RequestBody long commentId, String comment, ApplicationUser applicationUser){
        Review newReview = new Review();
        newReview.setCommentId(commentId);
        newReview.setComment(comment, applicationUser);
        return reviewService.addReview(newReview);
    } */

    /*
    @PostMapping(value = "/review")
    public Review addReview(@RequestBody Review newReview){
        return reviewService.addReview(newReview);
    }*/

    @PostMapping(value = "/review")
    public Review addReview(@RequestBody Review newReview){
        return reviewService.addReview(newReview,newReview.getUserId());
    }


    @PostMapping(value="/review/{commentId}")
    public String deleteReviewById(@PathVariable long commentId){
        return reviewService.deleteReviewById(commentId);
    }

    @PostMapping(value = "/updateReview/{oldCommentId}")
    public Review updateReviewById(@PathVariable long oldCommentId, @RequestBody Review updatedReview){
        return reviewService.updateReviewById(oldCommentId, updatedReview);
    }
}
