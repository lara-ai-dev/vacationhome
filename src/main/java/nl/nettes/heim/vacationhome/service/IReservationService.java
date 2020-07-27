package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Reservation;

import java.util.List;

public interface IReservationService {
    List<Reservation> getAllReservation();
    Reservation getReservationById(long id);
    Reservation addReservation(Reservation newReservation);
    Reservation updateReservationById(long id, Reservation updatedReservation);
    String deleteReservationById(long id);
}


