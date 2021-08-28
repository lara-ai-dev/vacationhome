package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.persistance.ApartmentRepository;
import nl.nettes.heim.vacationhome.persistance.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ApartmentService  {

    @Autowired
    private ApartmentRepository apartmentRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationService reservationService;

    public Apartment addApartment (Apartment newApartment) {
        return apartmentRepository.save(newApartment);
    }

    public List <Apartment> getAllApartments(){
        return apartmentRepository.findAll();
    }


    public Apartment getByApartmentId(long apartmentId){
        return apartmentRepository.findById(apartmentId).orElse(null);
    }



    public List<List> getReservedDates(long apartmentId){

        List<Reservation> allReservations = reservationRepository.findAll();
        List<List> reservations = new ArrayList<>();
        for( Reservation reservation : allReservations){

            Date startdate = reservation.getCheckInDate();
            Date enddate = reservation.getCheckOutDate();
            if(apartmentId == reservation.getApartmentId()) {
                reservations.add(reservationService.getDaysBetweenDates(startdate, enddate));
            }
        }
        return reservations;
    }

    public List<Apartment> getAvailableApartments(Date startDate, Date endDate){
        List<Apartment> allApartments = apartmentRepository.findAll();
        List<Apartment> availableApartments = new ArrayList<>();
        //going through all apartments
        for(Apartment apartment : allApartments){

                if(reservationService.checkAvailability(apartment, startDate, endDate)){
                    availableApartments.add(apartment);
                    System.out.println(availableApartments); }
        }
        return availableApartments;
    }

    public String deleteApartmentById (Long apartmentId){
        Optional<Apartment> apartment = apartmentRepository.findById(apartmentId);
        apartmentRepository.deleteById(apartmentId);
        return "Apartment with id" + apartment.get().getApartmentId() + "is deleted";
    }

}

