package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.persistance.ApplicationUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class AuthorizationService {

    private static final String ROLE_NOT_FOUND_ERROR = "Error: Role is not found";

    private ApplicationUserRepository applicationUserRepository;

}
