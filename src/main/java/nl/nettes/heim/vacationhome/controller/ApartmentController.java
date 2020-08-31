package nl.nettes.heim.vacationhome.controller;


import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.persistance.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class ApartmentController {

    @Autowired
    private ApartmentRepository apartmentRepository;

    @GetMapping(value = "api/apartment/{id}")
    public Apartment getApartmentById(@PathVariable Long id){
        Optional<Apartment> apartment = apartmentRepository.findById(id);
        return apartment.orElse(null);
    }


}
