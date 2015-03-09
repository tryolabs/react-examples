import json

from flask import Flask
app = Flask(__name__)

class Task(object):
    """A task."""

    def __init__(self, text):
        self.text = text

    def to_dict(self):
        return { "text": self.text }

class TaskList(object):
    """A list of Task objects."""

    def __init__(self, name, tasks):
        self.name = name
        self.tasks = tasks

    def to_dict(self):
        return {
            "name": self.name,
            "tasks": [task.to_dict() for task in self.tasks ]
        }

class Board(object):
    """A collection of TaskLists."""

    def __init__(self, lists):
        self.lists = lists

    def to_dict(self):
        return {
            "lists": [list.to_dict() for list in self.lists]
        }

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

@app.route("/api/board/")
def get_board():
    """Return the state of the board."""
    return json.dumps(DB.to_dict())

@app.route("/api/:list/task", methods=["PUT"])
def add_task(list_id):
    """Add a task to a list."""
    pass

if __name__ == "__main__":
    app.run(port=8000, debug=True)
