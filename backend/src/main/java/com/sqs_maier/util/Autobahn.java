package com.sqs_maier.util;

import java.util.ArrayList;

public enum Autobahn {

    A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A17, A19, A20, A21, A23, A24, A25, A26, A27, A28, A29, A30, A31, A33, A37, A38, A39, A40, A42, A43, A44, A45, A46, A48, A49, A52, A57, A59, A60, A61, A62, A63, A64, A65, A66, A67, A70, A71, A72, A73, A81, A92, A93, A94, A95, A96, A98, A99, A100, A103, A111, A113, A114, A115, A117, A143, A210, A215, A226, A252, A253, A255, A261, A270, A280, A281, A293, A352, A391, A392, A395, A445, A480, A485, A516, A524, A535, A540, A542, A555, A559, A560, A562, A565, A571, A573, A602, A620, A623, A643, A648, A656, A659, A661, A671, A672, A680, A681, A692, A831, A861, A980, A995, UNKNOWN;

    public static Autobahn findByString(String code) {
        for (Autobahn autobahn : Autobahn.values()) {
            if (autobahn.name().equalsIgnoreCase(code)) {
                return autobahn;
            }
        }
        return Autobahn.UNKNOWN;
    }

    public static boolean contains(String code) {
        for (Autobahn autobahn : Autobahn.values()) {
            if (autobahn.name().equalsIgnoreCase(code)) {
                return true;
            }
        }
        return false;
    }

}
