package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.exception.ReservationNotFoundException;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.persistance.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService implements IReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(long id){
        return reservationRepository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));}

    @Override
    public Reservation addReservation(Reservation newReservation){
        return reservationRepository.save(newReservation);
    }

    @Override
    public Reservation updateReservationById(long id, Reservation updatedReservation){
        return reservationRepository.findById(id).map(
                reservation -> {
                    reservation.setApartmentName(updatedReservation.getApartmentName());
                    reservation.setPrice(updatedReservation.getPrice());
                    return reservationRepository.save(reservation);
                })
                .orElseGet(() -> {
                    updatedReservation.setId(id);
                    return reservationRepository.save(updatedReservation);
                });
    }

    @Override
    public String deleteReservationById(long id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if(reservation.isPresent()){
            reservationRepository.deleteById(id);
            return "Reservation with id" + reservation.get().getId() + "is deleted";

        }
        throw new ReservationNotFoundException("Hello I dont exist");
    }
}
