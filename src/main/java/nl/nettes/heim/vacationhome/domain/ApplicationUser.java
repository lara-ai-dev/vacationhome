package nl.nettes.heim.vacationhome.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;



    private String password;
    private String userName;
    private String firstName;
    private String lastName;
    private Integer phoNo;
    private String address;
    private String email;


    @OneToMany (fetch = FetchType.EAGER, mappedBy = "guest",
    cascade = CascadeType.ALL, orphanRemoval =  true)
    private List<Reservation> reservations;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long id) {
        this.userId = id;
    }

    public String getUserName() {
        return userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public ApplicationUser setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setUserName(String firstName) {
        this.userName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String surName) {
        this.lastName = surName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getPhoNo() {
        return phoNo;
    }

    public void setPhoNo(Integer phoNo) {
        this.phoNo = phoNo;
    }
}