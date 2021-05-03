package nl.nettes.heim.vacationhome;


import nl.nettes.heim.vacationhome.controller.ApartmentController;
import nl.nettes.heim.vacationhome.controller.ReservationController;
import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.ApartmentService;
import nl.nettes.heim.vacationhome.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest
public class ApartmentTests {

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private ReservationService reservationService;


    @Autowired
    private ApartmentController apartmentController;
    @Autowired
    private ReservationController reservationController;


    @Test
    void checkAvailability() throws ParseException {

       /* Apartment apartment = new Apartment();
        apartment.setApartmentId(1L);
        apartment.setNumberOfGuests(2);
        Apartment apartment2 = new Apartment();
        apartment2.setApartmentId(2L);
        apartment2.setNumberOfGuests(2);*/

        Reservation reservation = new Reservation();
        reservation.setCheckInDate(2020,11,1,21,12);
        reservation.setCheckOutDate(2020,11,21,21,12);
        reservation.setApartmentId(1L);

        Reservation savedReservation1= reservationService.addReservation(reservation);


        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse("2020-11-02");
        Date endDate = format.parse("2020-11-05");
        Integer numberOfBeds = 2;

       for(Apartment apartment : (apartmentService.getAvailableApartments(startDate,endDate))){
            //System.out.println(apartment.getApartmentId());
        };
/*
        for(Apartment apartment : (apartmentService.getAllAvailableApartments(numberOfBeds,startDate,endDate))){
            System.out.println(apartment.getApartmentId());
        };*/


    }


}
