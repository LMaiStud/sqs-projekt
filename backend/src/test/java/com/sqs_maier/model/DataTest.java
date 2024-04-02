package com.sqs_maier.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Date;
import java.sql.Time;

class DataTest {

    @Test
    void testDataField() {
        // Arrange
        Data data = new Data();
        String testData = "Test Data";

        // Act
        data.setDataField(testData);

        // Assert
        assertEquals(testData, data.getDataField());
    }

    @Test
    void testMakeDate() {
        // Arrange
        Data data = new Data();
        Date testDate = new Date(System.currentTimeMillis());

        // Act
        data.setMakeDate(testDate);

        // Assert
        assertEquals(testDate, data.getMakeDate());
    }

    @Test
    void testMakeTime() {
        // Arrange
        Data data = new Data();
        Time testTime = new Time(System.currentTimeMillis());

        // Act
        data.setMakeTime(testTime);

        // Assert
        assertEquals(testTime, data.getMakeTime());
    }

    @Test
    void testHighwayCode() {
        // Arrange
        Data data = new Data();
        String testHighwayCode = "ABCD";

        // Act
        data.setHighwayCode(testHighwayCode);

        // Assert
        assertEquals(testHighwayCode, data.getHighwayCode());
    }

    @Test
    void testId() {
        // Arrange
        Data data = new Data();
        Long id = 1L;

        // Act
        data.setId(id);

        // Assert
        assertEquals(id, data.getId());
    }
}
