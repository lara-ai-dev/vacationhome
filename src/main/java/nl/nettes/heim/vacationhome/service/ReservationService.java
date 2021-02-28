package nl.nettes.heim.vacationhome.service;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.exception.ReservationNotFoundException;
import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.persistance.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservationService implements IReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(long id){
        return reservationRepository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));}

    @Override
    public Reservation addReservation(Reservation newReservation){
        return reservationRepository.save(newReservation);
    }

    @Override
    public Reservation updateReservationById(long id, Reservation updatedReservation){
        return reservationRepository.findById(id).map(
                reservation -> {
                    reservation.setApartmentId(updatedReservation.getApartmentId());
                    reservation.setPrice(updatedReservation.getPrice());
                    return reservationRepository.save(reservation);
                })
                .orElseGet(() -> {
                    updatedReservation.setId(id);
                    return reservationRepository.save(updatedReservation);
                });
    }

    @Override
    public String deleteReservationById(long id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if(reservation.isPresent()){
            reservationRepository.deleteById(id);
            return "Reservation with id" + reservation.get().getId() + "is deleted";

        }
        throw new ReservationNotFoundException("Hello I dont exist");
    }

    @Override
    public List<List> checkReservation(Date startDate, Date endDate, Apartment apartment){

        List<Reservation> allReservations = reservationRepository.findAll();
        List<Reservation> reservations = new ArrayList<>();
        for(Reservation reservation : allReservations){

            //check apartmentIds
            if(reservation.getApartmentId().equals(apartment.getApartmentId())){
                System.out.println(reservation.getCheckInDate());
                System.out.println(reservation.getCheckOutDate());
                // checking the checkIn & checkout  data --> if its between checkindata and checkoutdate
                if((reservation.getCheckInDate().after(startDate) && reservation.getCheckOutDate().before(endDate)) ||
                        (reservation.getCheckInDate().before(startDate) && reservation.getCheckOutDate().after(endDate))
                        ||  (reservation.getCheckInDate().before(startDate) && reservation.getCheckOutDate().before(endDate) && reservation.getCheckOutDate().after(startDate)) ||
                        (reservation.getCheckInDate().after(startDate) && reservation.getCheckOutDate().after(endDate) && reservation.getCheckInDate().before(endDate))
                ){
                    reservations.add(reservation);
                }
            }
        }

        List<List> result = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(endDate);
        calendar.add(Calendar.DATE, 1);
        endDate = calendar.getTime();

        //enddate should always start after startdate
        while (endDate.after(startDate)){
            Boolean isAvailable = true;
            for(Reservation reservation : reservations){
                Date tmpResStart = reservation.getCheckInDate();
                Date tmpResEnd = reservation.getCheckOutDate();
                if(tmpResEnd.after(startDate) && tmpResStart.before(startDate)){
                    isAvailable = false;
                    break;
                }
            }

            List<Object> tmpList = new ArrayList<>();
            tmpList.add(startDate);
            tmpList.add(isAvailable);
            result.add(tmpList);
            calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.add(Calendar.DATE, 1);
            startDate = calendar.getTime();
        }
        return result;

    }

    public boolean checkAvailability (Apartment apartment,Date startDate, Date endDate){

        List<List> result = checkReservation(startDate, endDate, apartment);
        Boolean available = true;
        for (List<Object> list : result){
            if(list.get(1).equals(false)){
                available = false;
            }
        }
        return available;
    }

    public List<List> getReservedDates(List<Date> reservedDates, Apartment apartment){

        List<Reservation> allReservations = reservationRepository.findAll();
        List<List> reservations = new ArrayList<>();
        for( Reservation reservation : allReservations){

            Date startdate = reservation.getCheckInDate();
            Date enddate = reservation.getCheckOutDate();
            Long apartmentId = reservation.getApartmentId();
            getDaysBetweenDates(startdate, enddate);
            reservations.add(reservedDates);
        }

        return reservations;

    }


    public static List<Date> getDaysBetweenDates(Date startdate, Date enddate)
    {
        List<Date> dates = new ArrayList<Date>();
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(startdate);

        while (calendar.getTime().before(enddate))
        {
            Date result = calendar.getTime();
            dates.add(result);
            calendar.add(Calendar.DATE, 1);
        }
        return dates;
    }






}
