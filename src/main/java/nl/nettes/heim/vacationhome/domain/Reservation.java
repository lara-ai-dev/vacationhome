package nl.nettes.heim.vacationhome.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator ="native")
    @GenericGenerator(
            name = "native",
            strategy = "native"
    )

    private Long id;

    private Integer reservationNumber;
    private Integer apartmentId;
    private boolean hasRoom;
    private float price;
    private Integer noGuests;
    private boolean payment;
    private String billingAddress;
    private Date checkInDate;
    private Date checkOutDate;



    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("reservations")

    private ApplicationUser guest;

    public Reservation(Date startDate, Date endDate) {
    }

    public Reservation() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(Integer apartmentName) {
        this.apartmentId = apartmentName;
    }

    public boolean isHasRoom() {
        return hasRoom;
    }

    public void setHasRoom(boolean hasRoom) {
        this.hasRoom = hasRoom;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public ApplicationUser getGuest() {
        return guest;
    }

    public void setGuest(ApplicationUser guest) {
        this.guest = guest;
    }

    public Integer getReservationNumber() {
        return reservationNumber;
    }

    public void setReservationNumber(Integer reservationNumber) {
        this.reservationNumber = reservationNumber;
    }

    public Integer getNoGuests() {
        return noGuests;
    }

    public void setNoGuests(Integer noGuests) {
        this.noGuests = noGuests;
    }

    public boolean isPayment() {
        return payment;
    }

    public void setPayment(boolean payment) {
        this.payment = payment;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Date getCheckInDate() {
        return checkInDate;
    }

    public Date setCheckInDate(Date checkInDate) {
        return this.checkInDate = checkInDate;
    }

    public Date setCheckInDate(int year, int month, int day, int hours, int minutes) {
        Date date = new Date();
        date.setHours(hours);
        date.setYear(year);
        date.setMinutes(minutes);
        date.setDate(day);
        date.setMonth(month);
        return this.checkInDate = date;
    }

    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public Date setCheckOutDate(Date checkOutDate) {
        return this.checkOutDate = checkOutDate;
    }

    public Date setCheckOutDate(int year, int month, int day, int hours, int minutes){
        Date date = new Date();
        date.setHours(hours);
        date.setYear(year);
        date.setMinutes(minutes);
        date.setDate(day);
        date.setMonth(month);
        return this.checkOutDate = date;
    }
}
