# Todo

- Fix current generation problems
- Add overlay grid for cars etc:
  - For this, each tile of the normal grid contains not only the background img but also another div "overlay" with:
    - position: absolute
    - z-index: -1 or 1 (not sure yet)
  - The background tile does not need any special css, damn. No idea how I missed that earlier.
  - How to position cars correctly though? I have two ideas:
    1. Each tile is either a row or a column, depending on GridPosition. For TRAVEL_DIR and OPPOSITE_DIR. Sub-elements need padding as to not touch the sidewalk.
       - needs special handling for signs etc 
    2. Each tile needs a 2x2 grid for cars and 3x3 for signs etc. Not sure if this will work.
- Do circs really need "needsRoadForward", "needsRoadLeft" and "needsRoadRight"? They could be inferred from subjects' turn signals and grid positions
- Check if it's possible for each rule set to define their own answers without collecting them all in one enum.
  - see right-of-way.service.ts#possibleDoAnswers
- road-utils.ts: Change GridPositions to cyclic doubly linked list? BOTTOM would be index 0 (can be used alongside an enum)
  - Example call: `grid[GridPosition.BOTTOM].right` would get the right road from the POV of a bottom car
- situation.service.ts: Other rule systems, no only DO_QUESTION.
