package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.exception.ReservationNotFoundException;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.persistance.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

    public List<List> checkReservation(Date startDate, Date endDate, Apartment apartment){

        List<Reservation> reservations = reservationRepository.findBetweenDates(startDate, endDate, apartment);
        List<List> result = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(endDate);
        calendar.add(Calendar.DATE, 1);
        endDate = calendar.getTime();

        while (endDate.after(startDate)){
            Boolean isAvailable = true;
            for(Reservation reservation : reservations){
                Date tmpResStart = reservation.getCheckInDate();
                Date tmpResEnd = reservation.getCheckOutDate();
                if(tmpResEnd.after(startDate) && tmpResStart.before(startDate)){
                    isAvailable = false;
                    break;
                }
            }
            List<Object> tmpList = new ArrayList<>();
            tmpList.add(startDate);
            tmpList.add(isAvailable);
            result.add(tmpList);
            calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.add(Calendar.DATE, 1);
            startDate = calendar.getTime();
        }
        return result;

    }
}
