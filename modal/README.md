# Modal

This is an example of creating a reusable modal component with React that
supports CSS animations.

It would be fairly easy to create a specific modal component that is mounted and
unmounted by toggling a bit of state in the parent component. However, what we
want is a little more complex:

* We want a reusable modal component, that you just wrap around the modal's
  contents, add some props, and it works, so you don't have to create a new
  component for each modal in your app.

* Animation support: We want to be able to write some CSS selectors that
  correspond to the various stages of the modal's lifecycle.

## Components

First, we have to use React's
[CSS Transition Group component](https://facebook.github.io/react/docs/animation.html):

```javascript
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
```

Next, we create the modal. This component automates the following:

* It determines whether or not it should be shown using a prop.
* It wraps its contents in a CSS Transition Group.

```javascript
var Modal = React.createClass({
    render: function() {
        if(this.props.isOpen){
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
                <div className="modal">
                  {this.props.children}
                </div>
              </ReactCSSTransitionGroup>
            );
        } else {
            return <ReactCSSTransitionGroup transitionName={this.props.transitionName} />;
        }
    }
});
```

Note how we use `this.props.children` to extract the component's body.

Because React requires that the render function return a component, rather than
returning `null` when the modal is not open, we return an empty transition
group.

Now, for this example, we'll create an `App` component to hold the state that
tells React whether the modal is open, and a couple of methods to open and close
it.

```javascript
var App = React.createClass({
    getInitialState: function() {
        return { isModalOpen: false };
    },

    openModal: function() {
        this.setState({ isModalOpen: true });
    },

    closeModal: function() {
        this.setState({ isModalOpen: false });
    },

    render: function() {
        return (
          <div className="app">
            <h1>App</h1>
            <button onClick={this.openModal}>Open modal</button>
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
              <h3>My Modal</h3>
              <div className="body">
                <p>This is the modal&apos;s body.</p>
              </div>
              <button onClick={this.closeModal}>Close modal</button>
            </Modal>
          </div>
        );
    }
});
```

As you can see in `render`, all we had to do was wrap the contents of the modal
in the `Modal` component, pass the state that determines whether its open, and
give the CSS transition a name (We'll use this later). Inside the body, we make
insert a call to the `closeModal` method. There's no need to bind anything.

Finally, we render the `App` component, and this concludes the JavaScript part
of this example:

```javascript
React.render(
    <App/>,
    document.body
);
```

## Style

Most of the stylesheet is not important to this example, it's just giving the
app and modal components a shape. The important part is the CSS animation
classes that React will use.

The `enter` selector sets the style for the component's initial state before
animation begins, and `enter-active` sets the final state:

```css
.modal-anim-enter {
    opacity: 0.00;
    transform: scale(0.7);
    transition: all 0.2s;
}

.modal-anim-enter.modal-anim-enter-active {
    opacity: 1;
    transform: scale(1);
}
```

`leave` and `leave-active` are the opposite:

```css
.modal-anim-leave {
    opacity: 1;
    transform: scale(1);
    transition: all 0.2s;
}

.modal-anim-leave.modal-anim-leave-active {
    opacity: 0.00;
    transform: scale(0.7);
}
```
