package com.sqs_maier.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AutobahnTest {

    @Test
    void findByString_ExistingCode() {
        // Arrange
        String code = "A1";

        // Act
        Autobahn autobahn = Autobahn.findByString(code);

        // Assert
        assertEquals(Autobahn.A1, autobahn);
    }

    @Test
    void findByString_IgnoreCase() {
        // Arrange
        String code = "a2";

        // Act
        Autobahn autobahn = Autobahn.findByString(code);

        // Assert
        assertEquals(Autobahn.A2, autobahn);
    }

    @Test
    void findByString_NonExistingCode() {
        // Arrange
        String code = "X99";

        // Act
        Autobahn autobahn = Autobahn.findByString(code);

        // Assert
        assertEquals(Autobahn.UNKNOWN, autobahn);
    }
}
