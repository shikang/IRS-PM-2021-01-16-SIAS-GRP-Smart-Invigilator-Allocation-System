package org.acme.optaplanner.solver;

import org.acme.optaplanner.domain.Duty;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.api.score.stream.Constraint;
import org.optaplanner.core.api.score.stream.ConstraintFactory;
import org.optaplanner.core.api.score.stream.ConstraintProvider;
import org.optaplanner.core.api.score.stream.Joiners;
import static org.optaplanner.core.api.score.stream.ConstraintCollectors.*;
import static org.optaplanner.core.api.score.stream.Joiners.*;

public class TimeTableConstraintProvider implements ConstraintProvider {

    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[] {
                // Hard constraints
                numberConflict(constraintFactory),
                dayConflict(constraintFactory),
                threeSiConflict(constraintFactory),
                siStdbyConflict(constraintFactory),
                stdbyConflict(constraintFactory),
                // Soft constraints 
                preference(constraintFactory)
        };
    }

    private Constraint numberConflict(ConstraintFactory constraintFactory) {
        // A staff can only have 3 duties at most.

        // Select a duty ...
        return constraintFactory.from(Duty.class)
                // count the number of duties for each staff
                .groupBy(Duty::getStaff, countDistinct())
                // filter out counts more than 3
                .filter((staff, count) -> count > 3)
                // then penalize each count more than 3 with a hard weight.
                .penalize("Number conflict", HardSoftScore.ONE_HARD);
    }

    private Constraint dayConflict(ConstraintFactory constraintFactory) {
        // A staff cannot have more than one duty on the same day.
        return constraintFactory
                // Select unique pair of duties
                .fromUniquePair(Duty.class,
                        // Check same staff
                        Joiners.equal(Duty::getStaff),
                        // Check same day
                        Joiners.equal(Duty::getDay))
                        // penalize duties with same staff and same day
                .penalize("Day conflict", HardSoftScore.ONE_HARD);
    }

    private Constraint threeSiConflict(ConstraintFactory constraintFactory) {
        // A staff cannot have 3 SI duties.
        return constraintFactory
                // select a duty
                .from(Duty.class)
                // pair with another duty
                .join(Duty.class)
                // pair with another duty
                .join(Duty.class)
                // filter if type is SI
                .filter((d1, d2, d3) -> d1.getType() == "SI" && d1.getType() == d2.getType() && d2.getType() == d3.getType())
                // penalize each staff with 3 SI duties
                .penalize("Three SI conflict", HardSoftScore.ONE_HARD);
    }

    private Constraint siStdbyConflict(ConstraintFactory constraintFactory) {
        // A staff cannot have both SI and Stdby duties.
        return constraintFactory
                // select a duty
                .from(Duty.class)
                // with duty type SI
                .filter(duty -> duty.getType() == "SI")
                // pair with another duty with same staff
                .join(Duty.class, Joiners.equal(Duty::getStaff))
                // find SI paired with Stdby
                .filter((dutySI, otherDuty) -> otherDuty.getType() == "Stdby")
                // penalize each pair of SI and Stdby duties
                .penalize("SI Stdby conflict", HardSoftScore.ONE_HARD);
    }

    private Constraint stdbyConflict(ConstraintFactory constraintFactory) {
        // A staff cannot have more than one Stdby duty.
        return constraintFactory
                // select a duty
                .from(Duty.class)
                // with duty type Stdby
                .filter(duty -> duty.getType() == "Stdby")
                // pair with another duty with same staff and type
                .join(Duty.class, Joiners.equal(Duty::getStaff), Joiners.equal(Duty::getType))
                // penalize each pair of Stdby duties with the same staff
                .penalize("Stdby conflict", HardSoftScore.ONE_HARD);
    }

    Constraint preference(ConstraintFactory constraintFactory) {
        // Staff prefers to have their preferred duties.
        return constraintFactory
                .from(Duty.class)
                .filter(duty -> duty.getId() == duty.getStaff().getPreference1() || duty.getId() == duty.getStaff().getPreference2() || duty.getId() == duty.getStaff().getPreference3())
                .reward("Preference", HardSoftScore.ONE_SOFT);
    }

}