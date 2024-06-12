package com.sqs_maier.controller;

import com.sqs_maier.service.DataService;
import com.sqs_maier.util.Autobahn;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ApiController {

    private final DataService dataService;

    public ApiController(DataService dataService) {
        this.dataService = dataService;
    }

    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost"})
    @GetMapping("/roadworks")
    @Operation(summary = "Get roadworks by id", description = "With this endpoint, construction sites on German highways can be retrieved")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful greeting"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "500", description = "not Found")
    })
    public ResponseEntity<String> getData(@RequestParam(value = "roadId") String roadId) throws IOException {
        Autobahn id = Autobahn.findByString(roadId);
        if(id.equals(Autobahn.UNKNOWN)){
            return ResponseEntity.notFound().build();
        }
        return dataService.getData(id);

    }
}