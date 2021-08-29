package nl.nettes.heim.vacationhome;

import nl.nettes.heim.vacationhome.domain.Apartment;
import nl.nettes.heim.vacationhome.service.ApartmentService;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class ApartmentControllerTests {

    //@Autowired
    //private TestRestTemplate restTemplate;


    @Autowired
    ApartmentService apartmentService;

    @Test
    public void addApartment()
            throws ClientProtocolException, IOException, JSONException {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://localhost:8080/api/apartment/add");
        httpPost.setHeader("Content-Type", "application/json");
        JSONObject json = new JSONObject();
        json.put("apartmentNumber", "33");
        json.put("apartmentId", "33");
        json.put("availableBeds", "3");

        StringEntity params = new StringEntity(json.toString());
        httpPost.setEntity(params);



        CloseableHttpResponse response = client.execute(httpPost);
        String jsonResponse = EntityUtils.toString(response.getEntity());

        Assert.assertEquals(200, response.getStatusLine().getStatusCode());
        Assert.assertTrue(jsonResponse.indexOf("\"apartmentNumber\":33") > 0);

        client.close();
    }

    @Test
    public void getAllApartments ()
        throws ClientProtocolException, IOException, JSONException {

        Apartment apartment1  = new Apartment();
        apartment1.setApartmentId(1L);
        apartmentService.addApartment(apartment1);

        Apartment apartment2  = new Apartment();
        apartment2.setApartmentId(2L);
        apartmentService.addApartment(apartment2);

        List<Long> apartmentIds = new ArrayList<>();
        apartmentIds.add(1L);
        apartmentIds.add(2L);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet httpget = new HttpGet("http://localhost:8080/api/apartment/all");

        CloseableHttpResponse response = client.execute(httpget);
        String jsonResponse = EntityUtils.toString(response.getEntity());
        System.out.println(jsonResponse);
        Assertions.assertEquals(200, response.getStatusLine().getStatusCode());
        Assertions.assertTrue(jsonResponse.indexOf("\"apartmentId\":2L") > 0);
        System.out.println(jsonResponse);

        client.close();
    }



}
