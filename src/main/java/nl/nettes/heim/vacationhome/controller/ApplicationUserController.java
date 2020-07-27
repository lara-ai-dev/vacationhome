package nl.nettes.heim.vacationhome.controller;

import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.persistance.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/user/auth")
public class ApplicationUserController {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @GetMapping(value = "/{id}")
    public ApplicationUser getUserbyId(@PathVariable Long id){
        Optional<ApplicationUser> user = applicationUserRepository.findById(id);
        return user.orElse(null);
    }

    //JSON bestand via postman -- database
    @PostMapping(value = "/")
    public ApplicationUser addUser(@RequestBody ApplicationUser newUser){
        return applicationUserRepository.save(newUser);
    }



}
