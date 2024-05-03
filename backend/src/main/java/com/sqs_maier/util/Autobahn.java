package com.sqs_maier.util;

import java.util.ArrayList;

public enum Autobahn {
    A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A17, A19, A20, A21, A23, A24, A25, A26, A27, A28, A29, A30, A31, A33, A37, A38, A39, A40, A42, A43, A44, A45, A46, A48, A49, A52, A57, A59, A60, A61, A62, A63, A64, A65, A66, A67, A68, A70, A71, A72, A73, A81, A92, A93, A94, A95, A96, A98, A99, UNKNOWN;


    public static Autobahn findByString(String code) {
        for (Autobahn autobahn : Autobahn.values()) {
            if (autobahn.name().equalsIgnoreCase(code)) {
                return autobahn;
            }
        }
        return Autobahn.UNKNOWN;
    }

    public static Autobahn[] getAllId(){
        return Autobahn.values();
    }
}
