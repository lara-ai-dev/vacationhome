package nl.nettes.heim.vacationhome.controller;

import nl.nettes.heim.vacationhome.payload.request.LoginRequest;
import nl.nettes.heim.vacationhome.payload.request.SignupRequest;
import nl.nettes.heim.vacationhome.payload.response.JwtResponse;
import nl.nettes.heim.vacationhome.payload.response.MessageResponse;
import nl.nettes.heim.vacationhome.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
