package org.acme.optaplanner.domain;

import java.util.List;

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;

@PlanningSolution
public class TimeTable {

    @ProblemFactCollectionProperty
    @ValueRangeProvider(id = "staffRange")
    private List<Staff> staffList;
    @PlanningEntityCollectionProperty
    private List<Duty> dutyList;

    @PlanningScore
    private HardSoftScore score;

    public TimeTable() {
    }

    public TimeTable(List<Staff> staffList, List<Duty> dutyList) {
        this.staffList = staffList;
        this.dutyList = dutyList;
    }

    public List<Staff> getStaffList() {
        return staffList;
    }

    public List<Duty> getDutyList() {
        return dutyList;
    }

    public HardSoftScore getScore() {
        return score;
    }

}