package nl.nettes.heim.vacationhome.controller;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.persistance.ReservationRepository;
import nl.nettes.heim.vacationhome.service.ApartmentService;
import nl.nettes.heim.vacationhome.service.IReservationService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;

@RestController
public class ReservationController {

    @Autowired
    private IReservationService reservationService;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ApartmentService apartmentService;


    @GetMapping(value = "/api/reservation")
    public List<Reservation> getAllReservations(){
        return reservationService.getAllReservation();
    }

    @GetMapping(value = "/api/reservation/{reservationId}")
    public Reservation getReservation(@PathVariable long reservationId){
        return reservationService.getReservationById(reservationId);
    }

    @PostMapping(value = "/api/reservation/add")
    public Reservation addReservation(@RequestBody Reservation newReservation){
        return reservationService.addReservation(newReservation);
    }

    /*
    @PostMapping (value="/api/reservation")
    public List<List> checkReservation(@RequestBody String request) throws JSONException, ParseException {
        JSONObject jsonObject = new JSONObject(request);
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date checkInDate = format.parse(String.valueOf(jsonObject.getString("checkInDate")));
        Date checkOutDate = format.parse(String.valueOf(jsonObject.getString("checkOutDate")));
        Long apartmentId =  Long.parseLong(String.valueOf(jsonObject.getString("apartmentId")));
        System.out.println(checkInDate);
        System.out.println(checkOutDate);
        return reservationService.checkReservation(checkInDate, checkOutDate, apartmentService.getByApartmentId(apartmentId));
    }*/


    @GetMapping(value="/api/reservation/reservedDates/{apartmentId}")
    public List<List> getReservedDates(@PathVariable long apartmentId){
        return reservationService.getReservedDates( apartmentId);
    }


    @DeleteMapping(value = "/api/reservation/delete/{reservationId}")
    public String deleteReservationById(@PathVariable long reservationId){
       return reservationService.deleteReservationById(reservationId);
    }

    @PutMapping(value = "api/reservation/{reservationId}")
    public Reservation updateReservationById(@PathVariable long reservationId, @RequestBody Reservation updatedReservation){
       return reservationService.updateReservationById(reservationId, updatedReservation);
    }
}
