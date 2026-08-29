Fly Design Engine — System Architecture

1. Architectural Purpose

The Fly Design Engine is an AI-assisted system for designing, constructing, explaining, visualizing, and modifying flies.

The architecture must support the central product philosophy:

A fly is a physical system, not a recipe.

The application must understand relationships between:

* User intent
* Environmental conditions
* Desired mechanics
* Fly architecture
* Functional components
* Materials
* Component positions
* Proportions
* Construction techniques
* Expected behavior

The architecture must therefore model relationships and causality, not merely store fly patterns and material lists.

⸻

2. Primary Product Flow

The primary user experience is:

USER DESIGN INTENT
        ↓
GUIDED DESIGN SESSION
        ↓
DESIGN STATE
        ↓
MECHANICS MODEL
        ↓
FLY ARCHITECTURE
        ↓
FUNCTIONAL COMPONENTS
        ↓
MATERIAL ASSIGNMENTS
        ↓
COMPONENT POSITIONING
        ↓
PROPORTION ENGINE
        ↓
FLY CONSTRUCTION MODEL
        ↓
VISUAL FLY MODEL
        ↓
CONSTRUCTION WALKTHROUGH
        ↓
COMPLETED FLY
        ↓
BEHAVIORAL VISUALIZATION
        ↓
TRACEABILITY + EXPLANATION
        ↓
DESIGN MODIFICATION
        ↓
ORIGINAL / MODIFIED COMPARISON

This represents the product journey.

It is NOT a strictly linear software pipeline.

Changes must be able to propagate through dependent systems.

⸻

3. Core Architectural Principle

The application must maintain a persistent Design State.

The Design State is the authoritative representation of the current fly being designed.

Other systems consume and modify structured aspects of this state.

Conceptually:

                    ┌────────────────────┐
                    │    DESIGN STATE    │
                    └─────────┬──────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ↓                   ↓                   ↓
     Mechanics            Construction        Visualization
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ↓
                       User Explanation

The LLM must NOT become the authoritative representation of the design.

Structured state is authoritative.

⸻

4. Design State

A Design State should eventually contain:

Design Intent
Species
Forage
Environmental Context
Design Targets
Desired Mechanics
Fly Architecture
Functional Components
Material Assignments
Component Positions
Proportions
Construction Steps
Predicted Characteristics
Tradeoffs
User Overrides
Version Information

Design State must be serializable.

A design should be able to be:

* Saved
* Loaded
* Duplicated
* Modified
* Compared
* Versioned

⸻

5. Design Session

The Design Session manages the user’s interaction with the guided design process.

It should record:

* User inputs
* Questions presented
* Answers
* Decisions
* Overrides
* Recommendations
* Revisions
* Session history

The session should allow the user to move backward through decisions without losing the design.

⸻

6. Decision Engine

The Decision Engine controls the guided design experience.

It should:

* Determine the next relevant question
* Validate answers
* Apply state changes
* Identify missing information
* Trigger dependent calculations
* Avoid asking unnecessary questions
* Respect user overrides

Decision logic should be structured and versioned.

The LLM may interpret natural-language input, but the Decision Engine should determine valid structured state changes.

⸻

7. Mechanics Model

The Mechanics Model converts design intent into desired and predicted physical characteristics.

Initial characteristics may include:

* Movement
* Sink rate
* Buoyancy
* Profile
* Drag
* Water displacement
* Stability
* Translucency
* Flash
* Flexibility
* Water absorption
* Durability
* Hook orientation

The MVP should use qualitative values:

LOW
MODERATE
HIGH

Avoid false scientific precision.

The model should represent both:

Desired Characteristics

What the user wants.

Predicted Characteristics

What the current design is likely to produce.

Conflicts

Where design choices work against each other.

Tradeoffs

What is gained and sacrificed by a design decision.

⸻

8. Fly Architecture

Fly Architecture defines the structural organization of the fly before individual materials are selected.

Examples:

* Single-hook streamer
* Articulated streamer
* Sculpin
* Leech
* Baitfish
* Crawfish
* Deceiver-style
* Hollow-fiber
* Deer-hair head

Architecture defines:

* Component sequence
* Major structural elements
* Tie-in zones
* Functional relationships
* Construction dependencies
* Proportional relationships

Architecture should not hard-code specific materials unless the architecture requires one.

⸻

9. Functional Components

A fly consists of functional components.

Initial components may include:

* Hook
* Thread
* Weight
* Tail
* Body
* Flash
* Wing
* Head
* Finish

Each component should be independently modeled.

A component should support:

Component
Function
Material
Position
Proportion
Construction Method
Mechanical Contribution
Dependencies

This allows materials to be interchangeable when they fulfill the same functional requirement.

⸻

10. Material Assignment

Materials are assigned to functional components.

Material selection should consider:

* Desired function
* Mechanical contribution
* Appearance
* Density
* Movement
* Durability
* Water absorption
* Availability
* User preference

The user must be able to override recommended materials.

The system should explain:

Why was this material selected?

and:

What alternatives could perform a similar function?

⸻

11. Component Positioning

Position is a first-class property.

The system must know where each component exists relative to the hook.

The hook acts as the primary reference frame.

Initial MVP zones:

EYE
FRONT
MID-FRONT
CENTER
MID-REAR
REAR
BEND

Future versions may support continuous coordinates.

A component may have:

Tie-in Position
Start Position
End Position
Extension
Height
Width
Density
Orientation
Alignment

⸻

12. Proportion Engine

The Proportion Engine manages relationships between physical dimensions.

Prefer relative measurements when practical.

Examples:

Tail Length = 1.5 × Hook Shank Length
Wing Length = Tail Length × 0.9
Head Width = Relative to Hook Gap
Body Width = Relative to Hook Gap

The exact formulas will evolve as domain knowledge is developed.

The Proportion Engine should allow a design to scale across hook sizes.

⸻

13. Fly Construction Model

The Construction Model represents how the physical fly is assembled.

Construction is sequential.

Each step should contain:

Step Number
Component
Material
Position
Quantity
Technique
Proportion
Dependencies
Purpose
Expected Visual Result
Common Mistakes

Example:

STEP 4
Component:
Tail
Material:
Marabou
Position:
Rear shank
Quantity:
Sparse clump
Extension:
Approximately 1.5 × hook shank
Technique:
Secure with controlled thread wraps
Purpose:
Provide movement and rear profile

The construction model must be capable of reconstructing the fly state.

⸻

14. Construction Dependencies

Construction steps may depend on earlier steps.

For example:

Hook
 ↓
Thread foundation
 ↓
Weight
 ↓
Tail
 ↓
Body
 ↓
Wing
 ↓
Head

The system should prevent invalid construction sequences where practical.

A component should be aware of which previous components establish its placement or support.

⸻

15. Visual Fly Model

The Visual Fly Model converts structured fly state into a visual representation.

MVP:

* 2D or 2.5D
* Layered components
* Relative positioning
* Relative scale
* Component colors/textures
* Silhouette

Future:

* 3D
* Rotation
* Multiple viewing angles
* Material-specific rendering
* Interactive component selection
* Animation

The visual model must be derived from structured fly data.

It must NOT simply be an AI-generated image unrelated to the actual design state.

⸻

16. Construction Visualization

The construction walkthrough should progressively build the visual fly.

For example:

STEP 1 → Bare Hook
STEP 2 → Thread Foundation
STEP 3 → Weight
STEP 4 → Tail
STEP 5 → Flash
STEP 6 → Body
STEP 7 → Wing
STEP 8 → Head
STEP 9 → Finished Fly

The visual state at each step should correspond to the construction state.

⸻

17. Behavioral Visualization

Behavioral visualization communicates predicted fly characteristics.

Initial behaviors:

* Sink
* Suspend
* Glide
* Dart
* Jig
* Pulse
* Push Water
* Track
* Swing

MVP visualization should be conceptual.

It should communicate tendencies without pretending to perform exact hydrodynamic simulation.

Example:

“This design should sink relatively quickly while maintaining a broad, mobile profile.”

Avoid unsupported numerical claims.

⸻

18. Traceability System

The system must preserve the relationship between design objectives and physical construction.

Example:

USER INTENT
High Movement
      ↓
DESIGN TARGET
Movement = HIGH
      ↓
COMPONENT
Tail
      ↓
MATERIAL
Mobile Material
      ↓
POSITION
Rear Shank
      ↓
DENSITY
Sparse
      ↓
EXPECTED CONTRIBUTION
High Movement

The user should be able to inspect this reasoning chain.

The system should answer:

Why is this component here?

Why this material?

Why this proportion?

What does changing this do?

⸻

19. Modification Engine

Design modifications must create new revisions.

Never destroy the original design.

Example:

ORIGINAL DESIGN
        ↓
USER REQUEST
"Make it sink faster."
        ↓
INTERPRET REQUEST
        ↓
PROPOSE STRUCTURED CHANGES
        ↓
UPDATE DESIGN STATE
        ↓
RECALCULATE DEPENDENCIES
        ↓
NEW DESIGN REVISION
        ↓
COMPARE

The system should identify:

* Changed components
* Changed positions
* Changed materials
* Changed proportions
* Changed predicted characteristics
* New tradeoffs

⸻

20. Dependency Propagation

Changes must propagate.

Example:

MOVE WEIGHT REARWARD
        ↓
WEIGHT POSITION CHANGES
        ↓
CENTER OF GRAVITY CHANGES
        ↓
PREDICTED ORIENTATION MAY CHANGE
        ↓
BEHAVIOR DESCRIPTION CHANGES
        ↓
EXPLANATION UPDATES

Another example:

SHORTEN TAIL
        ↓
PROFILE CHANGES
        ↓
MOVEMENT MAY CHANGE
        ↓
VISUAL MODEL UPDATES
        ↓
CONSTRUCTION STEP UPDATES
        ↓
DESIGN EXPLANATION UPDATES

The exact mechanics will become more sophisticated over time.

⸻

21. AI Orchestration

The AI layer sits above structured application logic.

AI responsibilities:

* Natural-language interpretation
* Explanation
* Teaching
* Alternative generation
* Conversational guidance
* Structured modification proposals
* Comparison explanations

AI should NOT independently invent authoritative fly state.

The preferred flow is:

USER LANGUAGE
      ↓
AI INTERPRETATION
      ↓
STRUCTURED REQUEST
      ↓
APPLICATION VALIDATION
      ↓
DESIGN STATE CHANGE
      ↓
MECHANICS / CONSTRUCTION / VISUAL RECALCULATION
      ↓
AI EXPLANATION

⸻

22. Knowledge Base

The Knowledge Base is a versioned source of structured domain information.

Categories:

Species
Forage
Hooks
Materials
Components
Techniques
Mechanics
Design Rules
Tradeoffs
Educational Content

Knowledge should be separated from application logic.

This allows the knowledge base to evolve independently.

⸻

23. Versioning

The system should eventually version:

* Design State
* Knowledge Base
* Decision Logic
* Mechanics Logic
* Construction Logic

Saved designs should retain enough version information to understand how they were created.

⸻

24. Data Integrity Principle

The application should distinguish between:

FACT

Known domain information.

RULE

Structured design relationship.

PREDICTION

Expected consequence of a design choice.

USER PREFERENCE

What the individual user wants.

AI INTERPRETATION

The AI’s understanding of natural-language input.

These should not be treated as interchangeable.

⸻

25. UI Architecture

The UI should expose the system without overwhelming the user.

Primary areas:

Guided Design

Choose-your-own-adventure interaction.

Design Summary

Current design state.

Fly Visualization

Current physical representation.

Construction

Step-by-step walkthrough.

Mechanics

Expected behavior and characteristics.

Why?

Traceability and explanation.

Modify

Natural-language or structured design changes.

Compare

Original versus modified designs.

⸻

26. Choose-Your-Own-Adventure Principle

The design experience should feel exploratory.

The user should be able to make meaningful decisions.

For example:

WHAT DO YOU WANT?
More movement
More sink
More profile
More flash
More stability

The application then presents relevant design consequences.

The user should learn through choices rather than completing a generic questionnaire.

⸻

27. MVP Scope

The first complete implementation should focus on:

Brown Trout → Sculpin → Streamer

The MVP should prove:

Intent
↓
Design State
↓
Mechanics
↓
Architecture
↓
Components
↓
Materials
↓
Position
↓
Proportion
↓
Construction
↓
Visualization
↓
Behavior
↓
Explanation
↓
Modification
↓
Comparison

Breadth should be sacrificed for depth.

⸻

28. Second Benchmark

After the Brown Trout → Sculpin experience is functional, implement the:

4-INCH GLIDE STREAMER

This benchmark tests whether the system can design a fly around desired mechanics rather than simply reproduce an established pattern.

It is therefore an important test of whether the architecture is actually functioning as a design engine.

⸻

29. Architecture Constraint

Do NOT build the system as:

Pattern Database
+
Material Database
+
AI Chatbot

That is explicitly NOT the intended product.

The intended system is:

DESIGN ENGINE
+
CONSTRUCTION ENGINE
+
MECHANICS MODEL
+
VISUAL MODEL
+
KNOWLEDGE BASE
+
AI INTERFACE

⸻

30. Development Principle

Build the smallest system capable of proving the core concept.

Do not prematurely optimize for:

* Thousands of patterns
* Hundreds of species
* Full 3D rendering
* Exact physics
* Marketplace integration
* Social features
* E-commerce
* Mobile native applications

The first objective is to prove:

A user can describe what they want a fly to do, and the system can help them design, construct, visualize, understand, and modify that fly.

That is the foundation of the Fly Design Engine.
