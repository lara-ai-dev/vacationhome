package nl.nettes.heim.vacationhome.persistance;

import nl.nettes.heim.vacationhome.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
