package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.domain.Reservation;
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

    public Apartment findChosenApartment(Apartment apartment){

        List<Apartment> allApartments = apartmentRepository.findAll();
         for(Apartment apartments : allApartments){
             if(apartments.getApartmentId().equals(apartment)){
                 return apartment;
             }
         }
        return null;
    }


}
