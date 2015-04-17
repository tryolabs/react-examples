var DragDropMixin = ReactDND.DragDropMixin;
var PropTypes = React.PropTypes;

const itemDropTarget = {
  acceptDrop: function(component, item) {
    window.alert('You dropped ' + item.name + '!');
  }
};

const itemDragSource = {
  beginDrag: function(component) {
    return {
      item: {
        name: component.props.name
      }
    };
  }
};

var ItemTypes = {
    ITEM: 'item'
};

var Item = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    name: PropTypes.string.isRequired
  },

  statics: {
    configureDragDrop: function(register) {
      register(ItemTypes.ITEM, {
        dragSource: itemDragSource
      });
    }
  },

  render: function () {
    const name = this.props;
    const isDragging = this.getDragState(ItemTypes.ITEM);
    const opacity = isDragging ? 0.4 : 1;

    return (
      <li className="item"
           {...this.dragSourceFor(ItemTypes.ITEM)}>
        {name}
      </li>
    );
  }
});

var Dustbin = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop: function(register) {
      register(ItemTypes.ITEM, {
        dropTarget: itemDropTarget
      });
    }
  },

  render: function() {
    const dropState = this.getDropState(ItemTypes.ITEM);

    var state = 'none';
    if (dropState.isHovering) {
      state = 'hovering';
    } else if (dropState.isDragging) {
      state = 'dragging';
    }

    return (
      <div className={'bin bin-state-' + state}
           {...this.dropTargetFor(ItemTypes.ITEM)}>
        {dropState.isHovering ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
});

var Container = React.createClass({
  render: function() {
    return (
      <div>
        <Dustbin />
        <ul className="items">
          <Item name='Glass' />
          <Item name='Banana' />
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
