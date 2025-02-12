
from fastapi import APIRouter, Depends
from .service import TaskService
from .dependencies import TaskDependency
from interfaces import Task, TaskBody, Response

router = APIRouter(
    prefix="/tasks",
)


@router.get("")
async def get_tasks(task_service: TaskService=Depends(TaskDependency.get('TaskService'))) -> list[Task]:
    payload = await task_service.get_list()
    return payload

@router.get("/{task_id}")
async def get_tasks(task_id: int, task_service: TaskService=Depends(TaskDependency.get('TaskService'))) -> list[Task]:
    payload = await task_service.get_task(task_id)
    return payload

@router.post("")
async def post_task(task: TaskBody, task_service: TaskService=Depends(TaskDependency.get('TaskService')))-> Task:
    print(f"Incoming task: {task}")
    data = await task_service.add_task(task)
    print(f"Outgoing: {data}")
    return data

@router.delete("/{task_id}")
async def delete_tasks(task_id: int, task_service: TaskService=Depends(TaskDependency.get('TaskService'))) -> Response:
    await task_service.remove(task_id)
    return Response(message="Successfully deleted the task", code=200)

@router.put("/{task_id}")
async def update_task(task: Task, task_id: int, task_service: TaskService = Depends(TaskDependency.get("TaskService")))-> Response:
    await task_service.update(task_id, task)
    return Response(message="Updated successfully!", code=200)
