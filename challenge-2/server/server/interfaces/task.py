
from pydantic import BaseModel, Field
import uuid
from uuid import UUID
from datetime import datetime

class Task(BaseModel):

    id: UUID = Field(default=uuid.uuid4(), description="The Task Id")
    title: str = Field(default="", description="The Task title")
    content: str = Field(default="", description="The task content")
    created_at: datetime = Field(default=datetime.now(), description="The Task time creation") 

class TaskBody(BaseModel):

    title: str = Field(default="", description="The Task title")
    content: str = Field(default="", description="The task content")