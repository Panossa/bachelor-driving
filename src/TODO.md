# Todo

Urgent:
- As a simple second rule set for crossings, add the rule that if a road is blocked by someone on the TRAVEL_DIRECTION, the user has to wait for the road to be clear.

Nice to have:
- Allow cars of different colors
	- reflect this change in the answer texts
- situation.service.ts: Other rule system, no only DO_QUESTION. Add ORDER_QUESTION for/powered by rightOfWay for crossings
	- BLOCKED BY COLOR TODO
- Add hint texts!
- Test other browsers (Edge, Firefox)!
- Generating subjects with TurnSignal.BOTH on straight roads for blocking question. 

After bachelor's thesis:
- Add CHECK_QUESTION for crossings? (maybe even straight roads?) Not sure if the answers would change though, lol.
- In case there are more than 3 possible answers, choose 3 randomly.
- SituationService: This might later be expanded with timeToAnswer in milliseconds as well as the points worth of the question for finer adjustments.
- Check if it's possible for each rule set to define their own answers without collecting them all in one enum.
	- see right-of-way.service.ts#possibleDoAnswers
- road-utils.ts: Change GridPositions to cyclic doubly linked list? BOTTOM would be index 0 (can be used alongside an enum)
	- Example call: `grid[GridPosition.BOTTOM].right` would get the right road from the POV of a bottom car
- The current road calculation ignores it's possible to turn into a garage rather than street, sadly.
- Support for when roads have more lanes
