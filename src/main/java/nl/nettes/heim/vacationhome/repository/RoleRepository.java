package nl.nettes.heim.vacationhome.repository;

import nl.nettes.heim.vacationhome.domain.model.ERole;
import nl.nettes.heim.vacationhome.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// extends JpaRepository and provides finder method
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName (ERole name);

}
