var DragDropMixin = ReactDND.DragDropMixin;

const ItemTypes = {
  ITEM: 'item'
};

var Item = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop: function(register) {
      register(ItemTypes.ITEM, {
        dragSource: {
          beginDrag: function(component) {
            return {
              item: {
                name: component.props.name
              }
            };
          }
        }
      });
    }
  },

  render: function () {
    return (
      <li className='item'
        {...this.dragSourceFor(ItemTypes.ITEM)}>
        {this.props.name}
      </li>
    );
  }
});

var Bin = React.createClass({
  mixins: [DragDropMixin],

  getInitialState: function() {
    return { items: [] };
  },

  addItem: function(name) {
    clone = this.state.items.slice(0);
    clone.push(name);
    this.setState({ items: clone });
  },

  statics: {
    configureDragDrop: function(register) {
      register(ItemTypes.ITEM, {
        dropTarget: {
          acceptDrop: function(component, item) {
            component.addItem(item.name);
          }
        }
      });
    }
  },

  render: function() {
    const dropState = this.getDropState(ItemTypes.ITEM);

    var stateClass = 'none';
    if (dropState.isHovering) {
      stateClass = 'hovering';
    } else if (dropState.isDragging) {
      stateClass = 'dragging';
    }

    const dropped = this.state.items.map(function(name) {
      return <li>{name}</li>;
    });

    return (
      <div className={'bin bin-state-' + stateClass}
        {...this.dropTargetFor(ItemTypes.ITEM)}>
        {dropState.isHovering ?
         'Release to drop' :
         'Drag item here'}
        <ul className="dropped">
          {dropped}
        </ul>
      </div>
    );
  }
});

var Container = React.createClass({
  render: function() {
    return (
      <div>
        <Bin />
        <ul className='items'>
          <Item name='Glass' />
          <Item name='Metal' />
          <Item name='Paper' />
        </ul>
      </div>
    );
  }
});

React.render(
  <Container />,
  document.body
);
