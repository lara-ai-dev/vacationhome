package nl.nettes.heim.vacationhome.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Review {


    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private long commentId;


    private String comment;

    private Long userId;
    private String userName;


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

    public long getUserId() {
        return userId;
    }

    public Review setUserId(Long userId) {
        this.userId = userId;
        return this;
    }

    public String getUserName() {
        return userName;
    }

    public Review setUserName(String userName) {
        this.userName = userName;
        return this;
    }
}
