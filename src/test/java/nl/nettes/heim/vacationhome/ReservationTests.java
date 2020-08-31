package nl.nettes.heim.vacationhome;


import nl.nettes.heim.vacationhome.controller.ApplicationUserController;
import nl.nettes.heim.vacationhome.controller.ReservationController;
import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.ApplicationUserService;
import nl.nettes.heim.vacationhome.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ReservationTests {

    private ReservationService reservationService;

    @Autowired
    private ReservationController reservationController;

    @Test
    void addReservation(){
        Reservation newReservation = new Reservation();
        newReservation.setReservationNumber(12345);
        newReservation.setPrice(123);
        newReservation.setCheckInDate(2020,12,1,21,12);
        newReservation.setCheckOutDate(2020, 12, 1, 21, 12);
        newReservation.setNoGuests(12);
        newReservation.setBillingAddress("Meranerstrasse");

        Reservation savedReservation1= reservationController.addReservation(12345,123,2020, 2020, 12,true,"Meranderstrasse")
        Reservation savedReservation2 = reservationController.addReservation(newReservation);
        assertEquals(newReservation.getApartmentName(),savedReservation1.getApartmentName());
        assertEquals(newReservation,savedReservation2);
    }
}




