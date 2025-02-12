from .database import Database
from interfaces import Task, TaskBody
import uuid
from datetime import datetime


class TaskService:

    def __init__(self):
        self.db = Database()

    async def get_list(self):
        return self.db.get()
    
    async def get_task(self, index: int) -> list[Task]:
        return self.db.get(index)
    
    async def add_task(self, body: TaskBody) -> Task:

        task = Task(
            id=uuid.uuid4(),
            title=body.title,
            content=body.content,
            created_at=datetime.now()
        )
        self.db.add(task)

        print(self.db.get())

        return task

    async def remove(self, index:int):
        self.db.remove(index)

    async def update(self, index: int, task: Task):
        self.db.update(index, task)
