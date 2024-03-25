package com.service;

import com.sqs_maier.model.Data;
import com.sqs_maier.service.DataService;
import com.sqs_maier.service.ExternalApiService;
import com.sqs_maier.util.Autobahn;
import com.sqs_maier.repository.DataRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DataServiceTest {

    @Mock
    private DataRepository dataRepository;

    @Mock
    private ExternalApiService externalApiService;

    @InjectMocks
    private DataService dataService;

    @Test
    public void testGetData_ExistingData() throws IOException {
        // Arrange
        Autobahn roadId = Autobahn.A1;
        Data existingData = new Data();
        existingData.setData("Existing Data");
        existingData.setHighwayCode(roadId.name());
        existingData.setMakeTime(Time.valueOf(LocalTime.now()));
        existingData.setMakeDate(Date.valueOf(LocalDate.now()));

        when(dataRepository.existsByHighwayCode(roadId.name())).thenReturn(true);
        when(dataRepository.findFirstByHighwayCode(roadId.name())).thenReturn(existingData);

        // Act
        ResponseEntity<String> responseEntity = dataService.getData(roadId);

        // Assert
        assertEquals("Existing Data", responseEntity.getBody());
        verify(externalApiService, never()).fetchDataFromExternalAPI(any());
        verify(dataRepository, never()).save(any());
    }

    @Test
    public void testGetData_NonExistingData() throws IOException {
        // Arrange
        Autobahn roadId = Autobahn.A2;
        String newData = "New Data";
        Data createdData = new Data();
        createdData.setData(newData);
        createdData.setHighwayCode(roadId.name());
        createdData.setMakeTime(Time.valueOf(LocalTime.now()));
        createdData.setMakeDate(Date.valueOf(LocalDate.now()));

        when(dataRepository.existsByHighwayCode(roadId.name())).thenReturn(false);
        when(externalApiService.fetchDataFromExternalAPI(roadId)).thenReturn(newData);

        ResponseEntity<String> responseEntity = dataService.getData(roadId);

        // Assert
        assertEquals(newData, responseEntity.getBody());
        verify(dataRepository).save(any());
    }
}

