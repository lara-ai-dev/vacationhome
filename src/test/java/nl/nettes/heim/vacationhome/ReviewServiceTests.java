package nl.nettes.heim.vacationhome;

import nl.nettes.heim.vacationhome.controller.ReviewController;
import nl.nettes.heim.vacationhome.domain.Review;
import nl.nettes.heim.vacationhome.service.ReviewService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class ReviewServiceTests {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewController reviewController;

    @Test
    public void getAllReviews () throws ParseException {

        Review review1 = new Review();
        review1.setComment("Example comment1");
        review1.setUserName("ExampleUsername1");

        Review review2 = new Review();
        review2.setComment("Example comment2");
        review2.setUserName("ExampleUsername2");

        List<Review> reviewList = new ArrayList<>();
        reviewList.add(review1);
        reviewList.add(review2);

        Assert.assertTrue(reviewList.contains(review1));
        Assert.assertTrue(reviewList.contains(review2));

    }

    @Test
    public void getReviewById () throws ParseException {

        Review review = new Review();
        review.setCommentId(1L);
        review.setComment("Example comment");
        review.setUserName("ExampleUsername");

        List <Review> reviewList = new ArrayList<>();
        reviewList.add(review);

        Assertions.assertEquals(1L, review.getCommentId() );

    }

    @Test
    public void addReview () throws ParseException {

        Review review = new Review();
        review.setCommentId(1L);
        review.setComment("Example comment");
        review.setUserName("ExampleUsername");


        List <Review> reviewList = new ArrayList<>();
        reviewList.add(review);

        Assert.assertTrue("Example comment", reviewList.contains("Example comment"));

    }

    @Test
    public void deleteReviewById() throws ParseException {

        Review review = new Review();
        review.setCommentId(1L);
        review.setComment("Example comment");
        review.setUserName("ExampleUsername");

        Review reviewList = reviewController.addReview(review);
        reviewService.deleteReviewById(1L);

        Assert.assertThrows(NullPointerException.class,()->{
            reviewController.getCommentById(1L).getCommentId();
        });
    }


}
