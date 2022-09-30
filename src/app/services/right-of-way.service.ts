import { Injectable } from '@angular/core';
import {DriveDirections} from '../models/enums/drive-direction.enum';
import {Circumstance} from '../models/circumstance';
import {TrafficSubject} from '../models/traffic-subject';
import {DoAnswer} from '../models/enums/do-answer.enum';

/**
 * This probably doesn't need to be a service after all, but it might grow in complexity later.
 */
@Injectable({
  providedIn: 'root'
})
export class RightOfWayService {

	calculateCorrectDoAnswers(driveDirection: DriveDirections, circumstances: Circumstance[]): DoAnswer[] {

		return null;
	}

	// calculateCorrectCheckAnswers(): CheckAnswer[] {
	// 	return null;
	// }

	// calculateCorrectExpectAnswers(): ExpectAnswers[] {
	// 	return null
	// }

	calculateRightOfWayOrder(): TrafficSubject[] {
		return null;
	}
}
