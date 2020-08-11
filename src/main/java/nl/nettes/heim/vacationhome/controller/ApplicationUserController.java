package nl.nettes.heim.vacationhome.controller;

import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.payload.LoginRequest;
import nl.nettes.heim.vacationhome.payload.response.JwtResponse;
import nl.nettes.heim.vacationhome.persistance.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class ApplicationUserController {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @GetMapping(value = "api/user/{id}")
    public ApplicationUser getUserbyId(@PathVariable Long id){
        Optional<ApplicationUser> user = applicationUserRepository.findById(id);
        return user.orElse(null);
    }

    //JSON bestand via postman -- database

    @PostMapping(value = "api/user/")
    public ApplicationUser addUser(@RequestBody ApplicationUser newUser){
        return applicationUserRepository.save(newUser);
    }




}
