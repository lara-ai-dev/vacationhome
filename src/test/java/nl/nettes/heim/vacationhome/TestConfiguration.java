package nl.nettes.heim.vacationhome;

import nl.nettes.heim.vacationhome.service.ApartmentService;
import nl.nettes.heim.vacationhome.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages={"nl.nettes.heim.vacationhome.service"})
public class TestConfiguration {
    @Autowired
    private ApartmentService apartmentService;
    @Autowired
    private ReservationService reservationService;
}
