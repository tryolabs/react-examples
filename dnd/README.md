# Drag and Drop

An example of implementing drag and drop using [React DnD][dnd].

[dnd]: https://github.com/gaearon/react-dnd

## Components

First, we declare what happens when items are dragged and dropped:

```js
const itemDropTarget = {
  acceptDrop: function(component, item) {
    component.addItem(item.name);
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
```

There's only a single type of item, `item`.

Next, we define the `Item` component, and declare it draggable:

```js
var Item = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop: function(register) {
      register(ItemTypes.ITEM, {
        dragSource: itemDragSource
      });
    }
  },

  render: function () {
    const name = this.props.name;

    return (
      <li className='item'
           {...this.dragSourceFor(ItemTypes.ITEM)}>
        {name}
      </li>
    );
  }
});
```

Now we define the component we can drop objects into:

```js
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
        dropTarget: itemDropTarget
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
          'Drag item here'
        }
        <ul className="dropped">
          {dropped}
        </ul>
      </div>
    );
  }
});
```

## Style

Now it's time to add some CSS.

First, some general style:

```css
body {
    margin: 0;
    padding: 0;
    min-height: 100vh;

    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

Now we make the bin a big square in the middle:

```css
.bin {
    width: 300px;
    margin: 35px auto;
    padding: 45px;

    color: white;
    font-size: 2em;
    text-align: center;

    border-radius: 5px;
}
```

We used CSS classes to mark up the different states of the bin, so now let's use
those to change the color of the bin to match the state:

```css
.bin-state-none {
    background-color: #34495E;
}

.bin-state-dragging {
    background-color: #E98B39;
}

.bin-state-hovering {
    background-color: #2ECC71;
}
```

Since we show a list of items that have been dropped inside the bin, let's style
that:

```css
.dropped {
    margin: 20px 0;
    padding: 0;
}

.dropped li {
    list-style-type: none;
    font-size: 0.6em;
}
```

And finally, the items that can be dropped:

```css
.items {
    padding: 0;
    text-align: center;
}

.item {
    display: inline-block;
    padding: 20px;
    margin: 25px 10px;

    border: 2px solid #E74C3C;
}
```
