package nl.nettes.heim.vacationhome.persistance;

import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
}
