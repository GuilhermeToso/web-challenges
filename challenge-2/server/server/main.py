from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from todo import router
import uvicorn

app = FastAPI(
    title="The To-do API",
    description="This API allows CRUDD operations on to-do's tasks",
    version="1.0.0",
    root_path="/api/v1"
)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(router)

if __name__ == "__main__":
    config = uvicorn.Config(app="main:app", reload=True)
    server = uvicorn.Server(config)
    server.run()
