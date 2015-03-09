from flask import Flask
app = Flask(__name__)

class Task(object):
    """A task."""

    def __init__(self, text):
        self.text = text

class TaskList(object):
    """A list of Task objects."""

    def __init__(self, name, tasks):
        self.name = name
        self.tasks = tasks

class Board(object):
    """A collection of TaskLists."""

    def __init__(self, lists):
        self.lists = lists

@app.route("/api/task/", methods=["PUT"])
def hello():
    pass

if __name__ == "__main__":
    app.run(port=8000)
