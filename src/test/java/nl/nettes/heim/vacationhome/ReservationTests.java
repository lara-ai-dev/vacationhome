package nl.nettes.heim.vacationhome;


import nl.nettes.heim.vacationhome.controller.ReservationController;
import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.SQLOutput;
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
    void checkReservation(){

        Apartment apartment = new Apartment();
        //apartment.setApartmentId(12345);
        Reservation savedReservation1= reservationController.addReservation(12345,123,new Date(2020,12,1,21,12), new Date(2020,12,21,21,12), 12,true,"Meranerstrasse_9",12345);

        System.out.println(savedReservation1);
        System.out.println("HELLO");
        System.out.println((reservationService.checkReservation(new Date(2020,12,2,21,12), new Date(2020,12,5,21,12),apartment)));



    }
}




