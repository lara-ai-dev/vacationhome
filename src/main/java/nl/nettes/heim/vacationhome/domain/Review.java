package nl.nettes.heim.vacationhome.domain;

import javax.persistence.*;

@Entity
public class Review {


    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private long commentId;


    private String comment;

    //private Long userId;
    private String userName;
    private String fileName;
    private String type;
    private String reviewId;
    private int rating;

    public Review() {

    }


    public long getCommentId() {
        return commentId;
    }

    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    /*public long getUserId() {
        return userId;
    }

    public Review setUserId(Long userId) {
        this.userId = userId;
        return this;
    }*/

    public String getUserName() {
        return userName;
    }

    public Review setUserName(String userName) {
        this.userName = userName;
        return this;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @Lob
    private byte[] data;


    public Review(String fileName, String type, byte[] data){
        this.fileName = fileName;
        this.type = type;
        this.data = data;
    }
    public String getFilename() {
        return fileName;
    }

    public void setFilename(String filename) {
        this.fileName = filename;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getReviewId() {
        return reviewId;
    }
}
