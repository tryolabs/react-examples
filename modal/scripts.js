var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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

React.render(
    <App/>,
    document.body
);
