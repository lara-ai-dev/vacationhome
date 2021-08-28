package nl.nettes.heim.vacationhome.controller;


import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.persistance.ApartmentRepository;
import nl.nettes.heim.vacationhome.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ApartmentController {

    @Autowired
    private ApartmentRepository apartmentRepository;

    private ApartmentService apartmentService;

    @Autowired
    public ApartmentController(ApartmentService apartmentService){
        this.apartmentService = apartmentService;
    }

    @PostMapping("api/apartment/add")
    public Apartment addApartment(@RequestBody Apartment newApartment){
        return apartmentService.addApartment(newApartment);
    }

    @GetMapping(value = "api/apartment/all")
    public List<Apartment> getAllApartments() {
        return apartmentService.getAllApartments();
    }

    @GetMapping(value = "api/apartment/{apartmentId}")
    public Apartment getApartmentById(@PathVariable Long apartmentId){
        Optional<Apartment> apartment = apartmentRepository.findById(apartmentId);
        return apartment.orElse(null);
    }

    @GetMapping(value = "api/apartment/available/{startDate}/{endDate}")
    public List<Apartment> getAvailableApartments(@PathVariable(value = "startDate") String startDateString , @PathVariable(value = "endDate") String endDateString) throws ParseException {
        //JSONObject jsonObject = new JSONObject(request);
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse(startDateString);
        Date endDate = format.parse(endDateString);
        return apartmentService.getAvailableApartments(startDate, endDate);
    }

    @GetMapping(value="/api/apartment/reservedDates/{apartmentId}")
    public List<List> getReservedDates(@PathVariable long apartmentId){
        return apartmentService.getReservedDates( apartmentId);
    }

    @DeleteMapping (value = "api/apartment/delete/{apartmentId}")
    public String deleteApartmentById (@PathVariable Long apartmentId) {
        return apartmentService.deleteApartmentById(apartmentId);
    }

}
