# ContentUnit draggable media interaction report

## Why this stress test exists

Association drag-drop now renders `ContentUnit` directly when an association entry carries a unit.

This creates a useful stress test:

- draggable item wrappers;
- nested audio/video controls;
- browser media controls;
- native drag/drop events;
- keyboard focus.

The goal of this pass is observation, not a full solution.

## Preview changes

The Association drag-drop preview now includes:

- text units;
- image units;
- an audio unit using a short public sample;
- a video unit using a small public sample;
- a multimodal association group with text + image + audio + video.

The pipeline remains unchanged:

`AssociationSet -> associationToDragDropData -> associationDragDropDomRenderer -> AssociationDragDropUserInput -> evaluateAssociationDragDrop -> BHEResult`

## Observed / expected DOM behavior

### Clicking play

Audio and video controls are rendered inside the draggable item.

When the learner clicks a media control, the intended behavior is media interaction, not dragging. A minimal guard was added so `dragstart` from inside an `audio` or `video` element is prevented.

This keeps play/pause behavior conceptually separate from drag behavior.

### Dragging from the control

Dragging directly from an audio/video control is ambiguous:

- the browser may treat the control as the interaction target;
- native drag may interfere with media controls;
- behavior can vary by browser.

The renderer now prevents dragstart when the event starts from an `audio` or `video` element. This is not a complete solution, but it avoids the most obvious conflict.

### Dragging from the wrapper

Dragging from the item wrapper remains supported.

The draggable element still carries:

- `data-entry-id`;
- `draggable = true`;
- the same native drag/drop behavior as before.

This means the media item can still be moved by dragging the surrounding item area rather than the media control itself.

### Keyboard focus

Media controls introduce extra focus targets inside a draggable item.

Current state:

- browser media controls may receive focus;
- the draggable wrapper does not yet expose a dedicated keyboard move flow;
- Association drag-drop still lacks the click-to-move fallback already tested in Classification drag-drop.

This is acceptable for the POC, but not sufficient for production accessibility.

## Behavior audio

Audio is the first important conflict case because audio controls are compact and likely to appear inside draggable vocabulary objects.

The current preview shows:

- an audio control;
- a transcript label;
- drag still possible from outside the control;
- drag prevented from the media control itself.

The main risk is that small draggable items may leave too little non-control space for easy dragging.

## Behavior video

Video was included as a small sample.

Video makes the layout issue more visible:

- it takes more space;
- controls are heavier;
- dragging from controls is more likely to conflict with playback interaction;
- draggable wrappers may need a future drag handle.

The current implementation is enough to observe the problem, not solve it.

## Impact on accessibility

The current media rendering improves semantic media display, but does not fully solve accessible drag/drop.

Remaining issues:

- no keyboard placement fallback in Association drag-drop;
- no explicit drag handle;
- no screen reader testing;
- nested media controls inside a button-like draggable item may need a more careful structure later;
- transcripts and alt text remain essential.

## Mobile impact

Native drag/drop is especially fragile on touch devices.

Audio/video controls also compete for gestures on mobile. A future mobile-friendly version should probably rely more on:

- select item;
- choose destination;
- move action;
- explicit drag handle only where useful.

## What this reveals for future draggable media

Draggable multimodal items should probably evolve toward a structure with separate interaction zones:

- content display area;
- media controls;
- optional drag handle;
- optional accessible move actions.

The current "whole item is draggable" model is fine for text and image, but becomes weaker with audio/video.

## Recommendations

Short term:

- keep this minimal guard against dragging from media controls;
- keep `label` as fallback and `aria-label`;
- manually test the preview in the browser;
- avoid using large audio/video items in complex drag/drop until the interaction model is clearer.

Next controlled step:

- add a click-to-move fallback to Association drag-drop, mirroring the Classification experiment.

Later:

- consider a small drag handle pattern for media-heavy draggable items;
- avoid a universal solution until at least one real media-heavy activity has been tested.
