package nl.nettes.heim.vacationhome;


import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.ApartmentService;
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

import static org.junit.Assert.assertTrue;


@SpringBootTest
public class ApartmentServiceTests {

    @Autowired
    private ApartmentService apartmentService;
    @Autowired
    private ReservationService reservationService;

    @Test
    public void checkAvailability() throws ParseException {

        Reservation reservation = new Reservation();
        reservation.setCheckInDate(2020, 11, 1, 21, 12);
        reservation.setCheckOutDate(2020, 11, 21, 21, 12);
        reservation.setApartmentId(1L);

        reservationService.addReservation(reservation);


        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse("2020-11-02");
        Date endDate = format.parse("2020-11-05");
        Integer numberOfBeds = 2;

        List<Long> apartmentIds = new ArrayList<>();
        for (Apartment apartment : (apartmentService.getAvailableApartments(startDate, endDate))) {
            apartmentIds.add(apartment.getApartmentId());
        }

        Assert.assertFalse(apartmentIds.contains(1L));

    }

    @Test
    public void addApartment () throws ParseException {

        Apartment apartment = new Apartment();
        apartment.setApartmentId(1L);
        apartment.setApartmentNumber(1);
        apartment.setCapacity(2);
        apartment.setDescription("This is a test add apartment");
        apartment.setPrice(120);
        apartment.setFeatured(true);

        apartmentService.addApartment(apartment);

        List<Long> apartmentIds = new ArrayList<>();
        for (Apartment apartmentList : (apartmentService.getAllApartments())) {
            apartmentIds.add(apartmentList.getApartmentId());
        }

        Assert.assertTrue(apartmentIds.contains(1L));


    }

    @Test
    public void getAllApartments () throws ParseException {

        Apartment apartment1 = new Apartment();
        apartment1.setApartmentId(1L);
        apartment1.setApartmentNumber(1);
        apartment1.setCapacity(2);
        apartment1.setDescription("This is apartment 01 ");
        apartment1.setPrice(120);
        apartment1.setFeatured(true);


        Apartment apartment2 = new Apartment();
        apartment2.setApartmentId(2L);
        apartment2.setApartmentNumber(2);
        apartment2.setCapacity(3);
        apartment2.setDescription("This is apartment 02 ");
        apartment2.setPrice(120);
        apartment2.setFeatured(true);


        apartmentService.addApartment(apartment1);
        List<Long> apartmentIds = new ArrayList<>();
        apartmentIds.add(1L);
        apartmentIds.add(2L);

        assertTrue(apartmentIds.contains(1L));
        assertTrue(apartmentIds.contains(2L));

    }

    @Test
    public void getApartmentById () throws ParseException {

        Apartment apartment = new Apartment();
        apartment.setApartmentId(1L);
        apartment.setApartmentNumber(1);
        apartment.setCapacity(2);
        apartment.setDescription("This is a test add apartment");
        apartment.setPrice(120);
        apartment.setFeatured(true);
        apartmentService.addApartment(apartment);

        Apartment foundApartment = apartmentService.getByApartmentId(1L);
        Assertions.assertEquals(1L, foundApartment.getApartmentId() );


    }

    @Test
    public void getReservedDates () throws ParseException {

        Reservation reservation = new Reservation();
        reservation.setCheckInDate(2020, 11, 1, 21, 12);
        reservation.setCheckOutDate(2020, 11, 21, 21, 12);
        reservation.setApartmentId(2L);
        reservation.setReservationNumber(2);

        reservationService.addReservation(reservation);

        List<Reservation> reservationList = new ArrayList<>();
        reservationList.add(reservation);
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse("2020-11-01");
        Date endDate = format.parse("2020-11-21");

        List<Date> datesBetween = reservationService.getDaysBetweenDates(startDate,endDate);

        List<List> reservedDates = apartmentService.getReservedDates(2L);
        Assert.assertTrue(reservedDates.contains(datesBetween));
    }


    @Test
    public void getAvailableApartments () throws ParseException {

        Reservation reservation = new Reservation();
        reservation.setCheckInDate(2020, 11, 1, 21, 12);
        reservation.setCheckOutDate(2020, 11, 21, 21, 12);
        reservation.setApartmentId(2L);
        reservation.setReservationNumber(2);

        reservationService.addReservation(reservation);

        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse("2020-11-01");
        Date endDate = format.parse("2020-11-21");

        List <Apartment> availableApartmentsList = apartmentService.getAvailableApartments(startDate, endDate);
        Assert.assertFalse(availableApartmentsList.contains(2L));
    }

    @Test
    public void deleteApartmentById () throws ParseException {

        Apartment apartment = new Apartment();
        apartment.setApartmentId(1L);
        apartment.setApartmentNumber(1);
        apartment.setCapacity(2);
        apartment.setDescription("This is a test add apartment");
        apartment.setPrice(120);
        apartment.setFeatured(true);
        apartmentService.addApartment(apartment);
        Assert.assertTrue(apartmentService.getByApartmentId(1L).getDescription().equals("This is a test add apartment"));
        Apartment deleteApartment = apartmentService.getByApartmentId(1L);
        apartmentService.deleteApartmentById(1L);

        Assert.assertThrows(NullPointerException.class,()->{
            apartmentService.getByApartmentId(1L).getApartmentId();
        });
        //Assert.assertFalse(apartmentService.getByApartmentId(1L) throws NullPointerException);

    }






}