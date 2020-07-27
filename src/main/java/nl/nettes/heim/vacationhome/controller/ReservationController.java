package nl.nettes.heim.vacationhome.controller;


import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Reservation addReservation(@RequestBody Reservation newReservation){
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
