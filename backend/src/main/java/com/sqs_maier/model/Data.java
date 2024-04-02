package com.sqs_maier.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;

@Entity
public class Data {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String dataField;

    private Time makeTime;

    private Date makeDate;

    @Column(unique=true)
    private String highwayCode;

    public String getHighwayCode() {
        return highwayCode;
    }

    public void setHighwayCode(String highwayCode) {
        this.highwayCode = highwayCode;
    }

    public Time getMakeTime() {
        return makeTime;
    }

    public void setMakeTime(Time makeDate) {
        this.makeTime = makeDate;
    }

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDataField() {
        return dataField;
    }

    public void setDataField(String data) {
        this.dataField = data;
    }

    public Date getMakeDate() {
        return makeDate;
    }

    public void setMakeDate(Date makeDate) {
        this.makeDate = makeDate;
    }
}
