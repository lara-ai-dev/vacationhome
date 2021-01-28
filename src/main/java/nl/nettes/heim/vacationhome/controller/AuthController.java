package nl.nettes.heim.vacationhome.controller;

import nl.nettes.heim.vacationhome.domain.model.ERole;
import nl.nettes.heim.vacationhome.domain.model.Role;
import nl.nettes.heim.vacationhome.domain.model.User;
import nl.nettes.heim.vacationhome.payload.request.LoginRequest;
import nl.nettes.heim.vacationhome.payload.request.SignupRequest;
import nl.nettes.heim.vacationhome.payload.response.JwtResponse;
import nl.nettes.heim.vacationhome.payload.response.MessageResponse;
import nl.nettes.heim.vacationhome.repository.RoleRepository;
import nl.nettes.heim.vacationhome.repository.UserRepository;
import nl.nettes.heim.vacationhome.service.AuthorizationService;
import nl.nettes.heim.vacationhome.service.security.jwt.JwtUtils;
import nl.nettes.heim.vacationhome.service.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthorizationService authorizationService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authorizationService.authenticateUser(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> registerUser(@RequestBody SignupRequest signUpRequest) {
        return authorizationService.registerUser(signUpRequest);
    }

}