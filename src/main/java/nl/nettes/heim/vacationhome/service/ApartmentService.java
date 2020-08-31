package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.persistance.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApartmentService  {

    @Autowired
    private ApartmentRepository apartmentRepository;


    public Apartment getApartmentById(long id){
        return apartmentRepository.findById(id).orElse(null);
    }

    public List<Apartment> chosenApartment(long id, Apartment apartment){
         List<Apartment> apartments = new ArrayList<>();

         Boolean isAvailable = false;
         if(apartment.getApartmentId().equals(id)){
             isAvailable = true;
         }

        return apartments;


    }

}
