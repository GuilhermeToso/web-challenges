from interfaces import Task

class TaskDatabase:

    data: list[Task] = []

    def add(self, task: Task) -> None:
        self.data.append(task)

    def add_many(self, tasks: list[Task]) -> None:
        self.data.extend(tasks)

    def remove(self, index: int) -> None:
            del self.data[index]

    def update(self, index: int, task: Task) -> None:
        self.data[index] = task

    def get(self, index: int | None = None) -> list[Task]:
        if index == None:
            return self.data
        return [self.data[index]]
    

class Database():

    __instance: TaskDatabase | None = None

    def __new__(cls, *args, **kwargs):
        
        if not cls.__instance:
            cls.__instance = TaskDatabase()
        return cls.__instance
    

