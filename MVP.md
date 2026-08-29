Fly Design Engine — MVP Specification

MVP PURPOSE

The purpose of the MVP is to prove one fundamental idea:

A fly tyer can describe what they want a fly to do, and the application can guide them through designing, constructing, visualizing, understanding, and modifying that fly.

The MVP is NOT intended to be a comprehensive fly-tying application.

It is a proof of concept for the Fly Design Engine.

⸻

1. MVP DESIGN BENCHMARK

The first complete design experience is:

BROWN TROUT → SCULPIN → STREAMER

The user should be able to arrive at a completed sculpin streamer through guided design decisions.

The experience should feel like a choose-your-own-adventure for fly design rather than a form or recipe search.

⸻

2. MVP USER JOURNEY

The complete experience:

WELCOME
↓
WHAT ARE YOU TRYING TO ACCOMPLISH?
↓
SPECIES
↓
FORAGE
↓
CONDITIONS
↓
DESIRED BEHAVIOR
↓
DESIGN TARGETS
↓
ARCHITECTURE
↓
FUNCTIONAL COMPONENTS
↓
MATERIALS
↓
POSITIONING
↓
PROPORTIONS
↓
CONSTRUCTION
↓
VISUAL FLY
↓
BEHAVIOR
↓
WHY IT WORKS
↓
MODIFY
↓
COMPARE
↓
SAVE

Not every step needs to be a separate screen.

The experience should remain conversational and visually engaging.

⸻

3. WELCOME SCREEN

The first screen should immediately communicate the product’s purpose.

Primary message:

Design a fly. Don’t just tie one.

Supporting text:

Tell us what you want your fly to do. We’ll help you design the architecture, choose the components and materials, build it, and understand why it works.

Primary action:

START DESIGNING

Secondary action:

EXPLORE SAVED DESIGNS

⸻

4. DESIGN INTENT

The first meaningful interaction should be natural language.

Prompt:

What do you want this fly to do?

Example:

“I want a 3.5–4 inch sculpin streamer for brown trout that gets down quickly, glides when I pause it, and has a lot of movement.”

The application should interpret this into structured design targets.

The user should be able to edit or correct the interpretation.

⸻

5. DESIGN INTENT SUMMARY

After interpretation, display something like:

YOUR DESIGN

Target species
Brown Trout

Forage
Sculpin

Size
3.5–4 inches

Primary objectives

* Fast sink
* High movement
* Glide on pause

Secondary objective

* Sculpin profile

The user should be able to:

ACCEPT

or

CHANGE SOMETHING

⸻

6. SPECIES

The MVP only needs:

Brown Trout

The architecture should nevertheless allow additional species later.

Species information should eventually include:

* Feeding behavior
* Habitat
* Common forage
* Seasonal considerations
* Water conditions
* Relevant fly characteristics

Do not build a large species database for the MVP.

⸻

7. FORAGE

The MVP only needs:

Sculpin

The forage record should contain relevant design characteristics.

Examples:

* Body profile
* Typical size
* Movement
* Habitat
* Color tendencies
* Behavior
* Relevant presentation characteristics

The purpose is not to create a biological encyclopedia.

The purpose is to connect forage characteristics to fly design.

⸻

8. ENVIRONMENT

Ask only questions that can materially affect the design.

Potential MVP questions:

Water clarity

* Clear
* Moderate
* Stained

Current

* Slow
* Moderate
* Fast

Fishing depth

* Shallow
* Mid-depth
* Deep

The user should be able to skip questions.

The Decision Engine should avoid unnecessary questioning.

⸻

9. DESIRED BEHAVIOR

Present meaningful choices.

Example:

WHAT SHOULD THIS FLY DO?

Sink quickly

Glide

Dart

Pulse

Push water

Stay stable

The user can select multiple characteristics.

The system should explain conflicts when appropriate.

Example:

“A very aggressive sink profile can work against the slow-gliding behavior you’re asking for. We can compromise by moving weight forward while keeping the body relatively light.”

⸻

10. DESIGN TARGETS

Convert the user’s intent into structured targets.

Example:

Movement: HIGH
Sink Rate: HIGH
Glide: MODERATE/HIGH
Profile: HIGH
Stability: MODERATE
Water Displacement: MODERATE

These are design targets, not claims about the completed fly.

⸻

11. ARCHITECTURE RECOMMENDATION

The application should recommend a fly architecture based on the design targets.

Example:

RECOMMENDED ARCHITECTURE

Single-Hook Sculpin Streamer

Why:

This architecture provides a compact profile, allows forward weighting, and gives us room to create movement without requiring an articulated system.

The user should be able to:

USE THIS

or:

SEE ALTERNATIVES

⸻

12. ARCHITECTURE ALTERNATIVES

If alternatives are available, show a small number.

Example:

Single-hook sculpin

Best for: Compact profile and controlled sink.

Articulated sculpin

Best for: Maximum movement.

Hollow baitfish/sculpin

Best for: Large profile with reduced material density.

Each alternative should show:

* Benefits
* Costs
* Mechanical implications

Do not overwhelm the user.

⸻

13. FUNCTIONAL COMPONENTS

Once architecture is selected, establish the components.

Example:

Hook
Weight
Thread Foundation
Tail
Body
Flash
Wing/Profile
Head
Finish

Each component must have a functional purpose.

Example:

WEIGHT

Purpose:

Establish sink rate and influence orientation.

HEAD

Purpose:

Establish profile, water displacement, and front-end stability.

TAIL

Purpose:

Provide rear profile and movement.

⸻

14. MATERIAL SELECTION

Materials should be selected AFTER functional components exist.

The application should ask:

What characteristics do we need from this component?

Then recommend materials.

Example:

TAIL

Desired characteristics:

* High movement
* Low density
* Natural pulse

Possible materials:

* Marabou
* Rabbit
* Soft synthetic fiber

The application should explain the tradeoffs.

⸻

15. USER MATERIAL OVERRIDES

The user must be able to say:

“I don’t have that material.”

or:

“I want to use synthetic instead.”

The system should determine whether an alternative can satisfy the component’s functional requirements.

If it can:

“Yes. This material should preserve most of the intended movement, although it may reduce water absorption.”

If it cannot:

“You can use it, but expect a meaningful change in the design.”

⸻

16. COMPONENT POSITIONING

Once components and materials exist, determine where they go.

The user should see a simplified hook diagram.

Example:

EYE ───── FRONT ───── CENTER ───── REAR ───── BEND

Components should appear at their relative positions.

Example:

WEIGHT
      ███
TAIL
                                      ███████
BODY
                █████████████
HEAD
██████

The exact visual implementation may differ.

The key requirement is that position is represented as structured data.

⸻

17. POSITION EXPLANATION

Every major positioning decision should have a reason.

Example:

Weight: Front third

Placing the weight forward should encourage a nose-down attitude and help the fly reach depth while maintaining a relatively mobile rear section.

The user can accept or modify the position.

⸻

18. PROPORTION DESIGN

Show important proportions.

Example:

Tail

1.5× hook shank

Body

Approximately 60% of usable shank

Head

Approximately 20% of usable shank

Overall fly

3.75 inches

The user should be able to modify proportions.

⸻

19. DESIGN SUMMARY

Before construction, present:

YOUR FLY

Species

Brown Trout

Forage

Sculpin

Architecture

Single-hook sculpin streamer

Size

3.75 inches

Primary objectives

* Fast sink
* High movement
* Glide

Components

* Hook
* Weight
* Tail
* Body
* Flash
* Wing/Profile
* Head

Design characteristics

* High movement
* High sink
* Moderate/high profile
* Moderate stability

Then:

BUILD THIS FLY

⸻

20. CONSTRUCTION WALKTHROUGH

The application should present a step-by-step construction sequence.

MVP example:

STEP 1

Mount hook.

STEP 2

Establish thread foundation.

STEP 3

Install weight.

STEP 4

Construct tail.

STEP 5

Add flash.

STEP 6

Build body.

STEP 7

Construct wing/profile.

STEP 8

Build head.

STEP 9

Finish.

Each step should show:

* Materials
* Quantity
* Position
* Technique
* Purpose
* Proportion

⸻

21. VISUAL CONSTRUCTION

The visual fly should progressively assemble.

At Step 1:

Bare hook.

At Step 4:

Hook + weight + tail.

At Step 7:

Nearly completed fly.

At Step 9:

Completed fly.

The visualization should be tied directly to construction state.

⸻

22. COMPONENT INSPECTION

After the fly is completed, the user can select a component.

Example:

WEIGHT

Position
Front third

Purpose
Sink rate + orientation

Mechanical contribution
Increased sink / forward bias

Why here?
Helps the fly reach depth while preserving a lighter rear section.

Tradeoff
More forward weight may reduce the amount of free movement during pauses.

⸻

23. BEHAVIOR SCREEN

Show the predicted characteristics.

Example:

EXPECTED BEHAVIOR

Sink

HIGH

Movement

HIGH

Glide

MODERATE/HIGH

Profile

HIGH

Stability

MODERATE

The system should clearly label these as predictions.

⸻

24. WHY IT WORKS

Provide a design explanation.

Example:

This fly combines forward weighting with a relatively light, mobile rear section. The weighting supports the desired sink rate while the rear materials preserve movement. The broad head establishes the compact sculpin profile and adds water displacement.

This explanation should be generated from structured design state.

⸻

25. MODIFY THE FLY

Provide a prominent:

CHANGE SOMETHING

button.

Allow natural language.

Examples:

Make it sink faster.

Give it more movement.

Make the profile narrower.

Make the head smaller.

Move the weight back.

The system interprets the request into structured changes.

⸻

26. MODIFICATION PREVIEW

Before applying a significant change, show:

PROPOSED CHANGE

Move weight from:

Front 25%

to:

Front 40%

Expected effects

Sink:
↑

Movement:
Possible ↓

Stability:
↑

Tradeoff

The fly may reach depth faster but could lose some free movement during pauses.

Actions:

APPLY

CHANGE

CANCEL

⸻

27. DESIGN REVISION

When applied, create a new revision.

VERSION 1
Original
VERSION 2
Modified

Never destroy the original design.

⸻

28. ORIGINAL VS MODIFIED

Provide a comparison screen.

ORIGINAL

Visual representation

Characteristics

Construction

MODIFIED

Visual representation

Characteristics

Construction

Then:

WHAT CHANGED?

WHY?

EXPECTED EFFECT?

TRADEOFF?

⸻

29. SAVE DESIGN

Allow the user to save the completed design.

Saved design should retain:

* Design intent
* Design state
* Architecture
* Components
* Materials
* Positions
* Proportions
* Construction
* Predicted behavior
* Revision history

⸻

30. MVP UI PRINCIPLES

The application should feel:

* Visual
* Conversational
* Educational
* Exploratory
* Modern
* Simple

It should NOT feel like:

* A spreadsheet
* A database administration tool
* A traditional recipe website
* A long survey
* An AI chatbot with a fly-themed skin

⸻

31. MVP SUCCESS TEST

The MVP is successful if a new or intermediate fly tyer can complete the experience and answer:

WHAT AM I BUILDING?

A sculpin streamer for brown trout.

WHY AM I BUILDING IT THIS WAY?

Because the architecture and components support the desired behavior.

WHERE DOES EVERYTHING GO?

The application shows the positions and proportions.

HOW DO I BUILD IT?

The construction walkthrough provides the sequence.

WHAT SHOULD IT DO?

The behavioral model provides predicted characteristics.

WHAT HAPPENS IF I CHANGE IT?

The modification engine explains the consequences.

If the application can accomplish those six things, the MVP has proven the core product concept.

⸻

32. WHAT NOT TO BUILD YET

Do NOT prioritize:

* Large pattern libraries
* Hundreds of species
* Social networking
* Marketplace
* E-commerce
* User-to-user messaging
* Full 3D physics
* Exact hydrodynamic simulation
* AI-generated photorealistic fly images
* Mobile native application
* Automated fly tying machinery

Those may become future roadmap items.

The MVP exists to validate the design engine.

⸻

33. MVP NORTH STAR

The MVP should make the user feel:

“I didn’t just look up a fly. I designed one.”

That is the experience we are building.
