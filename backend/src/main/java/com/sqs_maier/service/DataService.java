package com.sqs_maier.service;

import com.sqs_maier.model.Data;
import com.sqs_maier.util.Autobahn;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.sqs_maier.repository.DataRepository;

import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class DataService {

    private final DataRepository dataRepository;
    private final ExternalApiService externalApiService;

    public DataService(DataRepository dataRepository, ExternalApiService externalApiService) {
        this.dataRepository = dataRepository;
        this.externalApiService = externalApiService;
    }

    public ResponseEntity<String> getData(Autobahn roadId) throws IOException {

        Data data = null;
        if(dataRepository.existsByHighwayCode(roadId.name())){
            data = dataRepository.findFirstByHighwayCode(roadId.name());
        }
        else {
            String newData = externalApiService.fetchDataFromExternalAPI(roadId);
            data = createRoad(newData, roadId);
        }
        return ResponseEntity.ok(data.getDataField());
    }

    private Data createRoad(String newData, Autobahn roadId){
        Data data = new Data();
        data.setDataField(newData);
        data.setHighwayCode(roadId.name());
        data.setMakeTime(Time.valueOf(LocalTime.now()));
        data.setMakeDate(Date.valueOf(LocalDate.now()));
        dataRepository.save(data);
        return data;
    }

}
