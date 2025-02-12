
from .service import TaskService
from interfaces import Dependency, T
from typing import Type

class TaskDependency(Dependency):

    services = {}

    @classmethod
    def add(self, dependency: Type[T]):
        key = dependency.__name__
        print(key)
        if key in self.services:
            return None
        self.services[key] = dependency
        print(self.services)

    @classmethod
    def remove(self, name: str):
        del self.services[name]

    @classmethod
    def update(self, dependency: Type[T]):
        self.remove(dependency.__name__)
        self.add(dependency)

    @classmethod
    def get(self, name: str):
        return self.services[name]


TaskDependency.add(TaskService)