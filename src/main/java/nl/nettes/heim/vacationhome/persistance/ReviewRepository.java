package nl.nettes.heim.vacationhome.persistance;

import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
