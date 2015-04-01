# Kanban

![Screenshot of the app](img/kanban.png)

This example will be, essentially, an underpowered Trello clone. Here we'll
actually run a server and implement persistent storage with optimistic updating.

## The Server

We'll be using [Flask][flask] for the server, since we don't need much. First,
the imports and the app definition:

```python
import json

from flask import Flask, request
app = Flask(__name__, static_url_path='', static_folder='.')
```

Now, some barebones models:

```python
class Task(object):
    """A task."""

    def __init__(self, text):
        self.text = text

    def to_dict(self):
        return {"text": self.text}


class TaskList(object):
    """A list of Task objects."""

    def __init__(self, name, tasks):
        self.name = name
        self.tasks = tasks

    def to_dict(self):
        return {
            "name": self.name,
            "tasks": [task.to_dict() for task in self.tasks]
        }


class Board(object):
    """A collection of TaskLists."""

    def __init__(self, lists):
        self.lists = lists

    def to_dict(self):
        return {
            "lists": [list.to_dict() for list in self.lists]
        }
```

For persistence, we'll just use the memory:

```python
DB = Board([
    TaskList(name="Todo",
             tasks=[
                 Task("Write example React app"),
                 Task("Write documentation")
             ]),
    TaskList(name="Done",
             tasks=[
                 Task("Learn the basics of React")
             ])
])
```

### Routes

And now, the routes. This is just a simple REST API that uses JSON, handles
actions and even some errors.

First, we need a route that will be called on application startup, to get the
initial (or current) state of the Kanban board:

```python
@app.route("/api/board/")
def get_board():
    """Return the state of the board."""
    return json.dumps(DB.to_dict())
```

We also need a way to add new tasks to a list, which is what `add_task` does.

```python
@app.route("/api/<int:list_id>/task", methods=["PUT"])
def add_task(list_id):
    # Add a task to a list.
    try:
        DB.lists[list_id].tasks.append(Task(text=request.form.get("text")))
    except IndexError:
        return json.dumps({"status": "FAIL"})
    return json.dumps({"status": "OK"})
```

And a way to delete tasks:

```python
@app.route("/api/<int:list_id>/task/<int:task_id>", methods=["DELETE"])
def delete_task(list_id, task_id):
    # Remove a task from a list.
    try:
        del DB.lists[list_id].tasks[task_id]
    except IndexError:
        return json.dumps({"status": "FAIL"})
    return json.dumps({"status": "OK"})
```

Finally, we use the root route to serve the `index.html` file:

```python
@app.route("/")
def index():
    return app.send_static_file('index.html')
```

And now we tell Flask to always run the server on port 8000:

```python
if __name__ == "__main__":
    app.run(port=8000, debug=True)
```

## The Client

The `<Task>` component is very simple, all it does is display its contents and a
little button to call a deletion callback.

```javascript
var Task = React.createClass({
  render: function() {
    return (
      <li className="task">
        {this.props.text}
        <span className="delete"
              onClick={this.props.deleteTask} />
      </li>
    );
  }
});
```

The `<AddTask>` component is just an input box and a button. When you write
text, it adds it to the internal `text` state, and when you click on the button,
it calls an `addTask` callback with the new task's text.

```javascript
var AddTask = React.createClass({
  getInitialState: function() {
    return { text: "" };
  },

  handleChange: function(event) {
    this.setState({text: event.target.value});
  },

  render: function() {
    return (
      <div className="add-task">
        <input type="text"
               value={this.state.text}
               onChange={this.handleChange} />
        <button type="button" onClick={this.props.addTask.bind(null, this.state.text)}>
          Add
        </button>
      </div>
    );
  }
});
```

The `<TaskList>` component has a single item of state, a list of tasks, and two
methods for deleting and adding tasks. The `deleteTask` method just takes the ID
of the pat to delete, uses jQuery to send the appropriate `DELETE` request, then
removes the matching task from the list.

This isn't quite optimistic updating, since it requires the request to at least
reach the server and receive a reply -- even if it fails.

The addTask method does just what you'd expect, sending a request then expanding
the tasks list.

```javascript
var TaskList = React.createClass({
  getInitialState: function() {
    return { tasks: this.props.tasks };
  },

  deleteTask: function(id) {
    var self = this;
    $.ajax({
      url: '/api/' + this.props.id + '/task/' + id,
      type: 'DELETE',
      success: function(result) {
        var tasks = self.state.tasks;
        tasks.splice(id, 1);
        self.setState({ tasks: tasks });
      }
    });
  },

  addTask: function(text) {
    var self = this;
    $.ajax({
      url: '/api/' + this.props.id + '/task',
      type: 'PUT',
      data: { 'text' : text },
      success: function(result) {
        self.setState({ tasks: self.state.tasks.concat([{ text: text }]) });
      }
    });
  },
});
```

The render method:

```javascript
render: function() {
  var self = this;
  var task_list = this.state.tasks.map(function(task, index) {
    return (
      <Task key={index}
            text={task.text}
            deleteTask={self.deleteTask.bind(self, index)} />
    );
  });
  return (
    <div className="task-list">
      <h1 className="list-title">
        {this.props.name}
      </h1>
      <ul className="list-tasks">
        {task_list}
      </ul>
      <AddTask addTask={self.addTask} />
    </div>
  );
}
```

The `<App>` component, in this example, has no methods other than `render`,
which just displays a list of `<TaskList>` components.

```javascript
var App = React.createClass({
  render: function() {
    var lists = this.props.lists.map(function(list, index) {
      return (
        <TaskList key={index}
                  id={index}
                  name={list.name}
                  tasks={list.tasks} />
      );
    });
    return (
      <div className="lists">
        {lists}
      </div>
    );
 }
});
```


Now, we render everything. First we call `/api/board` to get the initial state
of the board, and use this to render the `<App>` component.

```javascript
$(document).ready(function() {
  $.getJSON('http://localhost:8000/api/board', function(data) {
    React.render(
      <App lists={data.lists} />,
      document.body
    );
  });
});
```

And finally, some style:

```css
@charset "utf-8";

body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.lists {
    padding: 50px;
}

.task-list {
    width: 220px;
    float: left;
    margin-right: 25px;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.list-title {
    margin: 0;
    text-align: center;
}

.list-tasks {
    padding: 0;
}

.task {
    list-style-type: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.delete:before {
    content: "×";
}

.delete {
    color: red;
    float: right;
    font-weight: bold;
}
```

[flask]: http://flask.pocoo.org/
