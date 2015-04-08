var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Modal = React.createClass({
    render: function() {
        if(this.props.isOpen) {
            return (
              <div className="modal">
                <h3>My Modal</h3>
                <div className="body">
                  <p>This is the modal&apos;s body.</p>
                </div>
                <button onClick={this.props.handleClose}>Close modal</button>
              </div>
            );
        } else {
            return null;
        }
    }
});

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
        var modal = <Modal key="my-modal"
                           isOpen={this.state.isModalOpen}
                           handleClose={this.closeModal} />;
        return (
          <div className="app">
            <h1>App</h1>
            <button onClick={this.openModal}>Open modal</button>
            <ReactCSSTransitionGroup transitionName="modal-anim">
              {modal}
            </ReactCSSTransitionGroup>
          </div>
        );
    }
});

React.render(
    <App/>,
    document.body
);
