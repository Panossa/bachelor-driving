import {Injectable} from '@angular/core';
import {RuleCalculator} from './rule-calculator';
import {DoAnswer} from '../models/enums/do-answer.enum';
import {Situation} from '../models/situation';
import {GridPosition} from '../models/enums/grid-position.enum';
import {RoadSide} from '../models/enums/road-side.enum';

/**
 * This service decides whether it's allowed to overtake on a given straight road.
 * This rule set should only be triggered if there is a car in CENTER in TRAVEL_DIRECTION on a STRAIGHT_ROAD.
 */
@Injectable({
	providedIn: 'root'
})
export class OvertakeService implements RuleCalculator {
	readonly possibleDoAnswers: DoAnswer[] = [
		DoAnswer.DO_NOT_OVERTAKE,
		DoAnswer.OVERTAKE
	];

	calculateCorrectDoAnswers(situation: Situation): DoAnswer[] {
		let result: DoAnswer;
		for (let subject of situation.trafficSubjects) {
			// If there is any subject on the top, no matter the roadside, there is no clear path to overtake to.
			if (subject.gridPosition === GridPosition.TOP) {
				result = DoAnswer.DO_NOT_OVERTAKE;
				// There is no turning back if one car disallows an overtake.
				break;
			}

			// Check if no subject is on the opposite site
			if ([GridPosition.CENTER, GridPosition.BOTTOM].includes(subject.gridPosition)
				&& subject.orientation === RoadSide.OPPOSITE_DIRECTION) {
				result = DoAnswer.DO_NOT_OVERTAKE;
				break;
			}

			// If there is no subject on the opposite site, overtakes are only allowed if there is a free space in sight.
			// This means only if there is a subject in CENTER and none in TOP it's okay to overtake. We already checked for TOP.
			if (subject.gridPosition === GridPosition.CENTER && result !== DoAnswer.STAY) {
				// OVERTAKE will only be set if "STAY" was not previously set by other clauses.
				// Later clauses can still override OVERTAKE with STAY, because this is a forEach.
				result = DoAnswer.OVERTAKE;
			}
		}

		return [result];
	}
}
