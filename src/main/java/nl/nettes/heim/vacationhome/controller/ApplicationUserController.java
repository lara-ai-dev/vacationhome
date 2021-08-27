package nl.nettes.heim.vacationhome.controller;

import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.persistance.ApplicationUserRepository;
import nl.nettes.heim.vacationhome.service.ApplicationUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class ApplicationUserController {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;
    private ApplicationUserService applicationUserService;

    @PostMapping(value = "api/user/register")
    public ApplicationUser register(@RequestBody ApplicationUser newUser){
        return applicationUserRepository.save(newUser);
    }

    @GetMapping(value = "api/user/{userId}")
    public ApplicationUser getUserById(@PathVariable long userId){
        Optional<ApplicationUser> user = applicationUserRepository.findById(userId);
        return user.orElse(null);
    }

    @DeleteMapping(value = "api/user/delete/{userId}")
    public String deleteUserById (@PathVariable long userId) {
        return applicationUserService.deleteUserById(userId);
    }



}
