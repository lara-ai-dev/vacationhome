package nl.nettes.heim.vacationhome;


import nl.nettes.heim.vacationhome.controller.ReservationController;
import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.ReservationService;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class ReservationServiceTests {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReservationController reservationController;


    @Test
    void getAllReservation () throws ParseException {

        Reservation reservation1 = new Reservation();
        reservation1.setReservationId(1);
        reservation1.setCheckInDate(2020,11,1,21,12);
        reservation1.setCheckOutDate(2020,11,21,21,12);

        Reservation reservation2 = new Reservation();
        reservation2.setReservationId(2);
        reservation2.setCheckInDate(2020,12,1,21,12);
        reservation2.setCheckOutDate(2020,12,21,21,12);

        List<Reservation> reservationList = new ArrayList<>();
        reservationList.add(reservation1);
        reservationList.add(reservation2);

        Assert.assertTrue(reservationList.contains(reservation1));
        Assert.assertTrue(reservationList.contains(reservation2));

    }


    @Test
    void getReservationById () throws ParseException {

        Reservation reservation = new Reservation();
        reservation.setReservationId(1);
        reservation.setCheckInDate(2020,11,1,21,12);
        reservation.setCheckOutDate(2020,11,21,21,12);

        reservationService.addReservation(reservation);

        Reservation foundReservation = reservationService.getReservationById(1);
        Assertions.assertEquals(1, foundReservation.getReservationId());

    }


    @Test
    void addReservation () throws ParseException{

        Reservation reservation = new Reservation();
        reservation.setReservationId(1);
        reservation.setCheckInDate(2020,11,1,21,12);
        reservation.setCheckOutDate(2020,11,21,21,12);
        reservationService.addReservation(reservation);

        List<Long> reservationIds = new ArrayList<>();
        for (Reservation reservationList : (reservationService.getAllReservation())) {
            reservationIds.add(reservationList.getId());
        }

        Assertions.assertFalse(reservationIds.contains(1));
    }


    @Test
    void deleteReservationById () throws ParseException{

        Reservation reservation = new Reservation();
        reservation.setReservationId(1);
        reservation.setBillingAddress("testBillingAddress");
        reservation.setCheckInDate(2020,11,1,21,12);
        reservation.setCheckOutDate(2020,11,21,21,12);
        reservationService.addReservation(reservation);


        Assert.assertTrue(reservation.getReservationId().equals(1));
        reservationService.deleteReservationById(1);

        Assert.assertTrue(reservation.getReservationId().equals(1));
    }

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


        List<Long> reservationDates = new ArrayList<>();
        for (Date reservedDates : (reservationService.getDaysBetweenDates(startDate, endDate))) {
            reservationService.checkReservation(startDate, endDate, apartment);
        }

        Assert.assertFalse(reservationDates.contains(startDate));

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

        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse("2020-11-01");
        Date endDate = format.parse("2020-11-21");

        List<Date> reservationDates = new ArrayList<>();
        for (Date reservedDates : (reservationService.getDaysBetweenDates(startDate, endDate))) {
            reservationService.addReservation(reservation);
        }

        Assert.assertFalse(reservationDates.contains(startDate));
        Assert.assertFalse(reservationDates.contains(endDate));


    }


 }




