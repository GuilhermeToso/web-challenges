from abc import  ABC, abstractmethod
from .types import T
from typing import Type


class Dependency(ABC):

    def __init__(self):
        super().__init__()

    @abstractmethod
    def add(self, dependency: Type[T]) -> None:
        """Add a service dependency """
        pass

    @abstractmethod
    def remove(self, name: str) -> None:
        """Remove a service dependency"""
        pass

    @abstractmethod
    def update(self, dependency: Type[T]) -> None:
        """Update a service dependency"""
        pass

    @abstractmethod
    def get(self, name: str) -> Type[T]:
        """Get a service dependency"""
        pass
