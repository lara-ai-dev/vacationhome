package nl.nettes.heim.vacationhome;

import nl.nettes.heim.vacationhome.domain.Reservation;
import nl.nettes.heim.vacationhome.service.ReservationService;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
public class ReservationControllerTests {

    @Autowired
    ReservationService reservationService;

    @Test
    public void getReservation()
            throws ClientProtocolException, IOException, JSONException {

        Reservation reservation = new Reservation();
        reservation.setReservationNumber(33);
        reservationService.addReservation(reservation);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet httpget = new HttpGet("http://localhost:8080/api/reservation/1");

        CloseableHttpResponse response = client.execute(httpget);
        String jsonResponse = EntityUtils.toString(response.getEntity());
        Assertions.assertEquals(200, response.getStatusLine().getStatusCode());
        Assertions.assertTrue(jsonResponse.indexOf("\"reservationNumber\":33") > 0);

        client.close();
    }
}
