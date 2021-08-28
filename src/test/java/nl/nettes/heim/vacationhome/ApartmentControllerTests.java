package nl.nettes.heim.vacationhome;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;

import java.io.IOException;

public class ApartmentControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;


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



}
