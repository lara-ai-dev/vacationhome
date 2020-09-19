package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.controller.ReviewController;
import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.domain.Review;
import nl.nettes.heim.vacationhome.persistance.ApplicationUserRepository;
import nl.nettes.heim.vacationhome.persistance.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService  {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ApplicationUserRepository applicationUserRepository;



    public List<Review> getAllReviews(){
        return reviewRepository.findAll();
    }

    public Review getReviewById(long commentId){
        return reviewRepository.findById(commentId).orElse(null);
    }

    /*
    public Review addReview(Review newReview){
        return reviewRepository.save(newReview);
    } */

    public Review addReview(Review newReview, Long userId){

        List<ApplicationUser> applicationUsers = applicationUserRepository.findAll();
        for(ApplicationUser applicationUser : applicationUsers) {
            if (applicationUser.getUserId().equals(userId)) {
                newReview.setUserName(applicationUser.getUserName());
            }

        } return reviewRepository.save(newReview);
    }

    public String deleteReviewById(long commentId){
        Optional<Review> review = reviewRepository.findById(commentId);
        if(review.isPresent()){
            reviewRepository.deleteById(commentId);
            return "Review has been deleted";
        }
        return "Review has not been deleted";
    }

    public Review updateReviewById (long commentId, Review updatedReview){
        return reviewRepository.findById(commentId).map(
                review -> {
                    review.setCommentId(updatedReview.getCommentId());
                    review.setComment(updatedReview.getComment());
                    return reviewRepository.save(review);
                })
                .orElseGet(() -> {
                    updatedReview.setCommentId(commentId);
                    return reviewRepository.save(updatedReview);
                });
    }


}

