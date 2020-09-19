package nl.nettes.heim.vacationhome.controller;


import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.persistance.ApartmentRepository;
import nl.nettes.heim.vacationhome.service.ApartmentService;
import nl.nettes.heim.vacationhome.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class ApartmentController {

    @Autowired
    private ApartmentRepository apartmentRepository;

    private ApartmentService apartmentService;

    @Autowired
    public ApartmentController(ApartmentService apartmentService){
        this.apartmentService = apartmentService;
    }

    @GetMapping(value = "api/apartment/{apartmentId}")
    public Apartment getApartmentById(@PathVariable Long apartmentId){
        Optional<Apartment> apartment = apartmentRepository.findById(apartmentId);
        return apartment.orElse(null);
    }


}
