package nl.nettes.heim.vacationhome.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator ="native")
    @GenericGenerator(
            name = "native",
            strategy = "native"
    )

    private Long id;

    private String apartmentName;
    private boolean hasRoom;
    private double price;


    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("reservations")
    private ApplicationUser guest;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApartmentName() {
        return apartmentName;
    }

    public void setApartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
    }

    public boolean isHasRoom() {
        return hasRoom;
    }

    public void setHasRoom(boolean hasRoom) {
        this.hasRoom = hasRoom;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ApplicationUser getGuest() {
        return guest;
    }

    public void setGuest(ApplicationUser guest) {
        this.guest = guest;
    }


}
