
from typing import TypeVar
from pydantic import BaseModel,Field

T = TypeVar("T")


class Response(BaseModel):

    message: str = Field(default="", description="The response message")
    code: int = Field(default=0, description="The response code")

