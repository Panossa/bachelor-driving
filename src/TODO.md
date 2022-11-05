# Todo

Urgent:
- Add actual loading of a next question
- Apply difficulty:
	- number of cars (circumstances)
	- chances of getting full crossings rather than straight roads or T crossings
- Add rule set/questions/answers for straight roads. Can't ask right of way if there is no right.
	- Skip TurnSignal calculation for straight roads. There is no escape. 
	- allow straight roads to generate cars in CENTER for more variable questions? Right of way shouldn't get confused.
- As a simple second rule set, add the rule that if a road is blocked by someone on the TRAVEL_DIRECTION, the user has to wait for the road to be clear.
- In case there are more than 3 possible answers, choose 3 randomly. In case there are less than 3, take as many as possible.
- situation.service.ts: Other rule systems, no only DO_QUESTION.
- Add hint texts!

Nice to have:
- Allow cars of different colors
  - reflect this change in the answer texts

After bachelor's thesis:
- Check if it's possible for each rule set to define their own answers without collecting them all in one enum.
	- see right-of-way.service.ts#possibleDoAnswers
- road-utils.ts: Change GridPositions to cyclic doubly linked list? BOTTOM would be index 0 (can be used alongside an enum)
	- Example call: `grid[GridPosition.BOTTOM].right` would get the right road from the POV of a bottom car
- The current road calculation ignores it's possible to turn into a garage rather than street, sadly.
- Support for when roads have more lanes
