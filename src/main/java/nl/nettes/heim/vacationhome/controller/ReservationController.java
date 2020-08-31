package nl.nettes.heim.vacationhome.controller;

import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class ReservationController {

    @Autowired
    private IReservationService reservationService;


    @GetMapping(value = "/api/reservation")
    public List<Reservation> getAllReservations(){
        return reservationService.getAllReservation();
    }

    @GetMapping(value = "/api/reservation/{id}")
    public Reservation getReservation(@PathVariable long id){
        return reservationService.getReservationById(id);

    }

    @PostMapping(value = "/api/reservation")
    public Reservation addReservation(@RequestBody Integer reservationNumber, float price, Date checkInDate, Date checkOutDate, Integer noGuests, boolean payment, String billingAddress){
        Reservation newReservation = new Reservation();
        newReservation.setReservationNumber(reservationNumber);
        newReservation.setPrice(price);
        newReservation.setCheckInDate(checkInDate);
        newReservation.setCheckOutDate(checkOutDate);
        newReservation.setNoGuests(noGuests);
        newReservation.setPayment(payment);
        newReservation.setBillingAddress(billingAddress);
        return reservationService.addReservation(newReservation);
    }


    @DeleteMapping(value = "/api/reservation/{id}")
    public String deleteReservationById(@PathVariable long id){
       return reservationService.deleteReservationById(id);
    }

    @PutMapping(value = "api/reservation/{id}")
    public Reservation updateReservationById(@PathVariable long id, @RequestBody Reservation updatedReservation){
       return reservationService.updateReservationById(id, updatedReservation);
    }
}
