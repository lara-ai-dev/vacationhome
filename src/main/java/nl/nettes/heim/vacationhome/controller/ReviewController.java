package nl.nettes.heim.vacationhome.controller;


import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.domain.Review;
import nl.nettes.heim.vacationhome.payload.response.MessageResponse;
import nl.nettes.heim.vacationhome.payload.response.ReviewResponseFile;
import nl.nettes.heim.vacationhome.persistance.ReviewRepository;
import nl.nettes.heim.vacationhome.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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


    @PostMapping("/upload")
    public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file")MultipartFile file)  {
        String message = "";
        try {
            reviewService.store(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));

        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<ReviewResponseFile>> getListFiles(){
        List<ReviewResponseFile> files = reviewService.getAllFiles().map(review -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(review.getReviewId())
                    .toUriString();

            return new ReviewResponseFile(
                    review.getFilename(),
                    fileDownloadUri,
                    review.getType(),
                    review.getData().length
            );
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }




}
