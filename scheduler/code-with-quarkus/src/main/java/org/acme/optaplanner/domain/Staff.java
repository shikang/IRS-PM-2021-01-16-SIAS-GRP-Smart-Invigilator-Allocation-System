package org.acme.optaplanner.domain;

public class Staff {

    private String name;
    private Integer preference1;
    private Integer preference2;
    private Integer preference3;
    private Float timestamp;

    public Staff() {
    }

    public Staff(String name, Integer preference1, Integer preference2, Integer preference3, Float timestamp) {
        this.name = name;
        this.preference1 = preference1;
        this.preference2 = preference2;
        this.preference3 = preference3;
        this.timestamp = timestamp;
    }

    public String getName() {
        return name;
    }

    public Integer getPreference1() {
        return preference1;
    }

    public Integer getPreference2() {
        return preference2;
    }

    public Integer getPreference3() {
        return preference3;
    }

    public Float getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        return name + " " + preference1 + " " + preference2 + " " + preference3 + " " + timestamp;
    }

}