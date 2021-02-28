package nl.nettes.heim.vacationhome;



import nl.nettes.heim.vacationhome.controller.ReservationController;
import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.SQLOutput;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ReservationTests {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReservationController reservationController;


    @Test
    void checkReservation() throws ParseException {

        Apartment apartment = new Apartment();
        apartment.setApartmentId(1L);
        Reservation reservation = new Reservation();
        reservation.setCheckInDate(2020,11,1,21,12);
        reservation.setCheckOutDate(2020,11,21,21,12);
        reservation.setApartmentId(1L);
        Reservation savedReservation1= reservationService.addReservation(reservation);

        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse("2020-11-02");
        Date endDate = format.parse("2020-11-05");


        System.out.println(reservationService.checkReservation(startDate,endDate,apartment));



    }

    @Test
    void getReservedDates() throws ParseException{
        Apartment apartment = new Apartment();
        apartment.setApartmentId(1L);
        Reservation reservation = new Reservation();
        reservation.setCheckInDate(2020,11,1,21,12);
        reservation.setCheckOutDate(2020,11,21,21,12);
        reservation.setApartmentId(1L);
        Reservation savedReservation1= reservationService.addReservation(reservation);


        System.out.println(reservation.getCheckInDate());


    }
}




