package com.sqs_maier;

import com.sqs_maier.service.DataService;
import com.sqs_maier.util.Autobahn;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestPropertySource(locations = "classpath:application.properties")

class IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DataSource dataSource;

    @Test
    void IntegrationTest() throws Exception {
        Autobahn[] autobahns = Autobahn.values();
        autobahns = Arrays.stream(autobahns)
                .filter(autobahn -> !autobahn.equals(Autobahn.UNKNOWN))
                .toArray(Autobahn[]::new);

        List<String> apiResponses = getAllResponses(autobahns);

        //prueft ob jede Baustelle von Backend korrekt abgerufen wurde
        for (int index = 0; index < autobahns.length; index++) {
            String responseFromMockMvc = mockMvc.perform(MockMvcRequestBuilders.get("/roadworks")
                            .param("roadId", autobahns[index].toString())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andReturn().getResponse().getContentAsString();

            assertTrue(apiResponses.contains(responseFromMockMvc));
        }

        //prueft ob jede Baustelle von Backend korrekt in die DB gespeichert wurde
        List<String> apiResponsesFromDB = new ArrayList<>();
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM data")) {

            //hier wird geprueft ob die Data und der Autobahn Code korrekt in die DB gespeichert wurden
            while (resultSet.next()) {
                String responseFromDB = resultSet.getString("data_field");
                assertTrue(apiResponses.contains(responseFromDB));

                String responseCodeFromDB = resultSet.getString("highway_code");
                assertTrue(Autobahn.contains(responseCodeFromDB));
            }}


    }

    public List<String> getAllResponses(Autobahn[] autobahns){
        //holt sich alle aktuellen Autobahnbaustellen

        List<String> apiResponses = new ArrayList<>();

        for (Autobahn autobahn : autobahns) {
            String apiUrl = "https://verkehr.autobahn.de/o/autobahn/" + autobahn + "/services/roadworks";
            try {
                URL url = new URL(apiUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                apiResponses.add(response.toString());
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        return apiResponses;
    }
}
