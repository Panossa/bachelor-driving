import {Injectable} from '@angular/core';
import {TrafficSubject} from '../models/traffic-subject';
import {DoAnswer} from '../models/enums/do-answer.enum';
import {RoadSide} from '../models/enums/road-side.enum';
import {TurnSignal} from '../models/enums/turn-signal.enum';
import {removeElementsOfAFromB} from '../utils/array-utils';
import {haveNoneOnOppositeSiteWhoCanBlock, haveNoneOnTheirRightFilter} from '../utils/road-utils';
import {Situation} from '../models/situation';

/**
 * This probably doesn't need to be a service after all, but it might grow in complexity later.
 */
@Injectable({
  providedIn: 'root'
})
export class RightOfWayService {

	readonly possibleDoAnswers: DoAnswer[] = [
		DoAnswer.STAY,
		DoAnswer.START_DRIVING,
		DoAnswer.STALEMATE
	];

	calculateCorrectDoAnswers(situation: Situation): DoAnswer[] {
		const orderedTrafficSubjects = this.calculateRightOfWayOrder(situation);
		if (orderedTrafficSubjects.length === 0) {
			return [DoAnswer.STALEMATE];
		} else {
			if(orderedTrafficSubjects[0].includes(situation.oneself)){
				return [DoAnswer.START_DRIVING];
			} else {
				return [DoAnswer.STAY];
			}
		}
	}

	// calculateCorrectCheckAnswers(): CheckAnswer[] {
	// 	return null;
	// }

	// calculateCorrectExpectAnswers(): ExpectAnswers[] {
	// 	return null
	// }

	/**
	 * Example:
	 * [
	 * 	[0] = Everyone who can drive instantly (array),
	 * 	[1] = Others
	 * ]
	 */
	calculateRightOfWayOrder(situation: Situation): TrafficSubject[][] {
		console.log(`Calculate with: ${JSON.stringify(situation)}`);

		// Get list of traffic subjects
		let trafficSubjects: TrafficSubject[] = [
			// relevant traffic subjects for this case are all those who're waiting for the turn, i.e. those driving opposite to the user
			...situation.trafficSubjects.filter(subject => subject.orientation === RoadSide.OPPOSITE_DIRECTION),
			// add the car of the user
			situation.oneself
		];
		const totalTrafficSubjectCount = trafficSubjects.length;

		// Edge case 1 of 2: If there is only the user on the road, the right of way is clear.
		if(totalTrafficSubjectCount <= 1) {
			return [[situation.oneself]];
		}

		// Edge case 2 of 2: If there are subjects on every road and all want to drive forward or left => stalemate.

		// Count traffic subjects waiting for their turn AND wanting to go right.
		const waitingTrafficSubjects = trafficSubjects.filter(subject =>
			// waiting for their turn
			subject.orientation === RoadSide.OPPOSITE_DIRECTION
			// wanting to drive right
			&& subject.turnSignal !== TurnSignal.RIGHT
		).length;

		// Check roadCount against subjects waiting to go right. (In this simulation only one can wait per street.)
		if (situation.streetLayout.roadCount === waitingTrafficSubjects) {
			// Nobody can drive, result is empty!
			console.log(`Stalemate! Road count: ${situation.streetLayout.roadCount}. Subjects waiting for their turn who don't want to go right: ${waitingTrafficSubjects}.\nRoad count == waitingTrafficSubjects => Stalemate.`);
			return [];
		}

		const rightOfWayOrder = []; //actually two-dimensional

		// Note: the check for i<originalTrafficSubjectCount is not strictly needed but can
		// help avoid an endless loop and browser crashes in case an unexpected edge case is calculated.
		const originalTrafficSubjectCount = trafficSubjects.length;
		for (let i = 0; i < originalTrafficSubjectCount && trafficSubjects.length > 0; i++) {
			// 1. First go those who want to go to their right
			let simultaneouslyDrivingSubjects = trafficSubjects.filter(subject => subject.turnSignal === TurnSignal.RIGHT);
			console.log(`1. Remaining after "right": ${JSON.stringify(simultaneouslyDrivingSubjects)}`);

			// 2. Then go those who want to drive forward and have no one on their right.
			simultaneouslyDrivingSubjects = simultaneouslyDrivingSubjects.concat(
				trafficSubjects
					// ...who want to drive forward
					.filter(subject => subject.turnSignal === TurnSignal.NONE)
					// & who have no one on their right
					.filter((subject) => haveNoneOnTheirRightFilter(subject, trafficSubjects))
			);
			console.log(`2. Remaining after "forward & none on right": ${JSON.stringify(simultaneouslyDrivingSubjects)}`);

			// 3. Finally, those who want to drive left and have nobody on their right, as well as nobody blocking from the opposite site.
			// Theoretically, this only needs to be tested once.
			simultaneouslyDrivingSubjects = simultaneouslyDrivingSubjects.concat(trafficSubjects
				// ...who want to drive left
				.filter(subject => subject.turnSignal === TurnSignal.LEFT)
				// & who have no one on their right
				.filter((subject) => haveNoneOnTheirRightFilter(subject, trafficSubjects))
				// & who have no one on the opposite site who wants to go forward or right
				.filter((subject: TrafficSubject) => haveNoneOnOppositeSiteWhoCanBlock(subject, trafficSubjects))
			);
			console.log(`3. Remaining after "left & none on right & none opposite forward": ${JSON.stringify(simultaneouslyDrivingSubjects)}`);

			// Add all subjects who can drive in this iteration to the result order.
			if(simultaneouslyDrivingSubjects.length > 0) {
				rightOfWayOrder.push(simultaneouslyDrivingSubjects);
				// Remove those from the further equation:
				removeElementsOfAFromB(simultaneouslyDrivingSubjects, trafficSubjects);
			} else {
				console.error(`Check what happened in the RightOfWay calculations. Remaining traffic subjects: ${JSON.stringify(trafficSubjects)}`);
			}
		}

		// Sanity check:
		const orderedSubjectsCount = rightOfWayOrder.reduce(
			(previousSubjectCount, currentSubjectArray) => previousSubjectCount + currentSubjectArray.length,
			0
		);
		if(trafficSubjects.length !== 0 || orderedSubjectsCount !== totalTrafficSubjectCount) {
			console.error(`The amount of ordered (${orderedSubjectsCount}) and unordered (${totalTrafficSubjectCount}) subjects is not the same!
											\nMaybe send the rest in a last array element? \nRemaining traffic subjects: ${trafficSubjects.length}`);
		}
		console.log('Right of way array: ' + JSON.stringify(rightOfWayOrder));
		console.log('Traffic subjects: ' + JSON.stringify(trafficSubjects));

		return rightOfWayOrder;
	}

}
