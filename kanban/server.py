import json

from flask import Flask, request
app = Flask(__name__, static_url_path='', static_folder='.')


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
    try:
        DB.lists[list_id].tasks.append([Task(name=request.form.get("text"))])
    except IndexError:
        return json.dumps({"status": "FAIL"})
    return json.dumps({"status": "OK"})


@app.route("/api/:list/task", methods=["DELETE"])
def delete_task(list_id):
    """Remove a task from a list."""
    try:
        DB.lists[list_id].tasks.splice(list_id)
    except IndexError:
        return json.dumps({"status": "FAIL"})
    return json.dumps({"status": "OK"})


@app.route("/")
def index():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(port=8000, debug=True)
