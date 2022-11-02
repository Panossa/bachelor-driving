# Todo

- Fix stalemate. It only exists if there are 4 roads. Otherwise, the right most subject starts.
- situation.ts:53 make sure at least three roads are used... unless it's a straight road!
- As a simple second rule set, add the rule that if a road is blocked by someone on the TRAVEL_DIRECTION, the user has to wait for the road to be clear.
- Do circs really need "needsRoadForward", "needsRoadLeft" and "needsRoadRight"? They could be inferred from subjects' turn signals and grid positions
- Check if it's possible for each rule set to define their own answers without collecting them all in one enum.
	- see right-of-way.service.ts#possibleDoAnswers
- road-utils.ts: Change GridPositions to cyclic doubly linked list? BOTTOM would be index 0 (can be used alongside an enum)
	- Example call: `grid[GridPosition.BOTTOM].right` would get the right road from the POV of a bottom car
- situation.service.ts: Other rule systems, no only DO_QUESTION.
- The current road calculation ignores it's possible to turn into a garage rather than street, sadly.
- Support for when roads have more lanes
