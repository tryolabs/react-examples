# Modal

This is an example of creating a modal with React and using its animation
support.

It would be fairly easy to create a component that is mounted and unmounted by
toggling a bit of state in the parent component. However, what we want is a
little more complex:

* We want a reusable modal component, that wraps around its body with modal
  functionality.
* We want the component to animate mounting/unmounting using React's CSS
  transitions.
