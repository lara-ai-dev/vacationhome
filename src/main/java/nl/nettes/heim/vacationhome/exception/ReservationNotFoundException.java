package nl.nettes.heim.vacationhome.exception;

public class ReservationNotFoundException extends RuntimeException {

    public ReservationNotFoundException(Long id){
        super("Could not find reservation with id " + id);

    }

    public ReservationNotFoundException(String errorMessage){
        super(errorMessage);
    }
}
