package org.acme.optaplanner.domain;

import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.lookup.PlanningId;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

@PlanningEntity
public class Duty {

    @PlanningId
    private Integer id;

    private String day;
    private String time;
    private String length;
    private String classGroup;
    private String mod;
    private String type;
    private String room;
    private String ci;

    @PlanningVariable(valueRangeProviderRefs = "staffRange")
    private Staff staff;

    public Duty() {
    }

    public Duty(Integer id, String day, String time, String length, String classGroup, String mod, String type, String room, String ci) {
        this.id = id;
        this.day = day;
        this.time = time;
        this.length = length;
        this.classGroup = classGroup;
        this.mod = mod;
        this.type = type;
        this.room = room;
        this.ci = ci;
    }

    public Integer getId() {
        return id;
    }

    public String getDay() {
        return day;
    }

    public String getTime() {
        return time;
    }

    public String getLength() {
        return length;
    }

    public String getClassGroup() {
        return classGroup;
    }

    public String getMod() {
        return mod;
    }

    public String getType() {
        return type;
    }

    public String getRoom() {
        return room;
    }

    public String getCi() {
        return ci;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    @Override
    public String toString() {
        return day + " " + time + " " + type + " (" + id + ")";
    }

}