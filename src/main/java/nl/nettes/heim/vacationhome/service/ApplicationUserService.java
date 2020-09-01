package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.persistance.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.support.CustomSQLErrorCodesTranslation;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;


import java.util.List;
import java.util.Properties;

@Service
@Validated
public class ApplicationUserService {

    private static final String ROLE_NOT_FOUND_ERROR = "Error: Role is not found";

    @Autowired
    private ApplicationUserRepository applicationUserRepository;


    public ApplicationUser signIn(String userName, String password){
        List<ApplicationUser> allUsers = applicationUserRepository.findAll();
        for(ApplicationUser user : allUsers){
            if(user.getUserName().equals(userName) && user.getPassword().equals(password)){
                return user;
            }
        };
        return null;
    }




}
