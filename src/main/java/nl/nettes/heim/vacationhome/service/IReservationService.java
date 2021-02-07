package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.persistance.ReservationRepository;

import java.util.Date;
import java.util.List;

public interface IReservationService  {
    List<Reservation> getAllReservation();
    List<List> checkReservation(Date checkInDate, Date checkOutDate, Apartment apartment);
    Reservation getReservationById(long id);
    Reservation addReservation(Reservation newReservation);
    Reservation updateReservationById(long id, Reservation updatedReservation);
    String deleteReservationById(long id);




}


