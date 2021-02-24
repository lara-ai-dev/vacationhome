package nl.nettes.heim.vacationhome.controller;


import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.persistance.ApartmentRepository;
import nl.nettes.heim.vacationhome.service.ApartmentService;
import nl.nettes.heim.vacationhome.service.ReviewService;
import org.json.JSONException;
import org.json.JSONObject;
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

    @GetMapping(value = "api/apartment")
    public List<Apartment> getAllApartments() {
        return apartmentService.getAllApartments();
    }

    @GetMapping(value = "api/apartment/{apartmentId}")
    public Apartment getApartmentById(@PathVariable Long apartmentId){
        Optional<Apartment> apartment = apartmentRepository.findById(apartmentId);
        return apartment.orElse(null);
    }

    @PostMapping(value = "api/availableapartments")
    public List<Apartment> getAvailableApartments(@RequestBody String request)throws JSONException, ParseException {
        JSONObject jsonObject = new JSONObject(request);
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = format.parse(String.valueOf(jsonObject.getString("startDate")));
        Date endDate = format.parse(String.valueOf(jsonObject.getString("endDate")));
        return apartmentService.getAvailableApartments(startDate, endDate);
    }

}
