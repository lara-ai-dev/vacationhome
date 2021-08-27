package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.persistance.ApartmentRepository;
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
    private ReservationService reservationService;

    public Apartment addApartment (Apartment newApartment) {
        return apartmentRepository.save(newApartment);
    }

    public List <Apartment> getAllApartments(){
        return apartmentRepository.findAll();
    }


    public Apartment getByApartmentId(Long apartmentId){
        return apartmentRepository.findById(apartmentId).orElse(null);
    }

    public Apartment findChosenApartment(Apartment apartment){
        List<Apartment> allApartments = apartmentRepository.findAll();
        for(Apartment apartments : allApartments){
            if(apartments.getApartmentId().equals(apartment)){
                return apartment;
            }
        }
        return null;
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

