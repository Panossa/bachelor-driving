export class StreetLayout {
	readonly hasRoadLeft: boolean;
	readonly hasRoadRight: boolean;
	readonly hasRoadForward: boolean;
	readonly roadCount: number;
	// readonly needsRoadBack: boolean; - not relevant, ever?

	constructor(needsRoadLeft: boolean, needsRoadRight: boolean, needsRoadForward: boolean, roadCount: number) {
		this.hasRoadLeft = needsRoadLeft;
		this.hasRoadRight = needsRoadRight;
		this.hasRoadForward = needsRoadForward;
		this.roadCount = roadCount;
	}
}

export const STREET_LAYOUTS = {
	FULL_CROSSING: new StreetLayout(true, true, true, 4),
	STRAIGHT_ROAD: new StreetLayout(false, false, true, 2),
	T_CROSSING_LEFT_FORWARD: new StreetLayout(true, false, true, 3),
	T_CROSSING_RIGHT_FORWARD: new StreetLayout(false, true, true, 3),
	T_CROSSING_LEFT_RIGHT: new StreetLayout(true, true, false, 3)
};
