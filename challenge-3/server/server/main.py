from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import uvicorn.server
from weather import router

app = FastAPI(
    title="Weather API",
    description="This is the Weather API",
    version="1.0.0",
    root_path="/api/v1"
)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    expose_headers=["*"]
)

app.include_router(router)


if __name__ == "__main__":

    config = uvicorn.Config(app="main:app", reload=True)
    server = uvicorn.Server(config)
    server.run()
