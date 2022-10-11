import {Injectable} from '@angular/core';
import {DriveDirections} from '../models/enums/drive-direction.enum';
import {Circumstance} from '../models/circumstance';
import {TrafficSubject} from '../models/traffic-subject';
import {DoAnswer} from '../models/enums/do-answer.enum';
import {RoadSide} from '../models/enums/road-side.enum';
import {mapToTurnSignal, TurnSignals} from '../models/enums/turn-signal.enum';
import {removeDuplicatesFilter, removeElementsOfAFromB} from '../utils/array-utils';
import {TrafficSubjectTypes} from '../models/enums/traffic-subject-type.enum';
import {GridPosition} from '../models/enums/grid-position.enum';
import {calculateRoadCount, haveNoneOnOppositeSiteWhoWantToDriveForward, haveNoneOnTheirRightFilter} from '../utils/road-utils';

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

	private oneself: TrafficSubject;

	calculateCorrectDoAnswers(driveDirection: DriveDirections, circumstances: Circumstance[]): DoAnswer[] {
		const orderedTrafficSubjects = this.calculateRightOfWayOrder(driveDirection, circumstances);
		if (orderedTrafficSubjects.length === 0) {
			return [DoAnswer.STALEMATE];
		} else {
			if(orderedTrafficSubjects[0].includes(this.oneself)){
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
	calculateRightOfWayOrder(driveDirection: DriveDirections, circumstances: Circumstance[]): TrafficSubject[][] {
		console.log(`Calculate with: ${driveDirection} and ${JSON.stringify(circumstances)}`);

		this.oneself = {
			type: TrafficSubjectTypes.CAR,
			// viewed from a central perspective, the user is on the opposite driving direction for everyone involved
			orientation: RoadSide.OPPOSITE_DIRECTION,
			gridPosition: GridPosition.BOTTOM,
			turnSignal: mapToTurnSignal(driveDirection)
		};
		console.log(`oneself: ${JSON.stringify(this.oneself)}`);

		// Get list of traffic subjects
		let trafficSubjects: TrafficSubject[] = [...circumstances.map(circumstance => circumstance.trafficSubjects).reduce(
			(previousSubjects, currentSubjects) => [...previousSubjects, ...currentSubjects],
			[]
		).filter(removeDuplicatesFilter), // watch out when adding color to subjects!
			// add the car of the user
			this.oneself
		];
		const totalTrafficSubjectCount = trafficSubjects.length;

		// Edge case 1 of 2: If there is only the user on the road, the right of way is clear.
		if(totalTrafficSubjectCount <= 1) {
			return [[this.oneself]];
		}

		// Edge case 2 of 2: If there are subjects on every road and all want to drive forward or left => stalemate.
		// Count how many roads there are
		const roadCount = calculateRoadCount(circumstances); // for "back" road, where the user sits.

		// Count traffic subjects waiting for their turn AND wanting to go right.
		const waitingTrafficSubjects = trafficSubjects.filter(subject =>
			// waiting for their turn
			subject.orientation === RoadSide.OPPOSITE_DIRECTION
			// wanting to drive right
			&& subject.turnSignal === TurnSignals.RIGHT // TODO shouldn't that be !== RIGHT? RIGHT turning subjects can't get into a stalemate
		).length;

		// Check roadCount against subjects waiting to go right. (In this simulation only one can wait per street.)
		console.log(roadCount);
		console.log(waitingTrafficSubjects);
		if (roadCount === waitingTrafficSubjects) {
			// Nobody can drive, result is empty!
			console.log('Stalemate!');
			return [];
		}

		const rightOfWayOrder = []; //actually two-dimensional

		// Note: the check for i<originalTrafficSubjectCount is not strictly needed but can
		// help avoid an endless loop and browser crashes in case an unexpected edge case is calculated.
		const originalTrafficSubjectCount = trafficSubjects.length;
		for (let i = 0; i < originalTrafficSubjectCount && trafficSubjects.length > 0; i++) {
			// 1. First go those who want to go to their right
			let parallelDrivingSubjects = trafficSubjects.filter(subject => subject.turnSignal === TurnSignals.RIGHT);
			console.log(`1. TempSubjects: ${JSON.stringify(parallelDrivingSubjects)}`);

			// 2. Then go those who want to drive forward and have no one on their right.
			parallelDrivingSubjects = parallelDrivingSubjects.concat(
				trafficSubjects
					// ...who want to drive forward
					.filter(subject => subject.turnSignal === TurnSignals.NONE)
					// & who have no one on their right
					.filter((subject) => haveNoneOnTheirRightFilter(subject, trafficSubjects))
			);
			console.log(`2. TempSubjects: ${JSON.stringify(parallelDrivingSubjects)}`);

			// 3. Finally, those who want to drive left and have nobody on their right, as well as nobody blocking from the opposite site.
			// Theoretically, this only needs to be tested once.
			parallelDrivingSubjects = parallelDrivingSubjects.concat(trafficSubjects
				// ...who want to drive left
				.filter(subject => subject.turnSignal === TurnSignals.LEFT)
				// & who have no one on their right
				.filter((subject) => haveNoneOnTheirRightFilter(subject, trafficSubjects))
				// & who have no one on the opposite site who wants to go forward (or right, but we already checked that above)
				.filter((subject: TrafficSubject) => haveNoneOnOppositeSiteWhoWantToDriveForward(subject, trafficSubjects))
			);
			console.log(`3. TempSubjects: ${JSON.stringify(parallelDrivingSubjects)}`);

			// Add all subjects who can drive in this iteration to the result order.
			if(parallelDrivingSubjects.length > 0) {
				rightOfWayOrder.push(parallelDrivingSubjects);
				// Remove those from the further equation:
				removeElementsOfAFromB(parallelDrivingSubjects, trafficSubjects);
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
