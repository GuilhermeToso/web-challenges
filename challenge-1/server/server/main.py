from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pokemon import router as pokemon
import uvicorn

app = FastAPI(
    title="Pokemon Species Explorer",
    description="This API allows the data retrieval of the Pokemon species by generation",
    version="1.0.0",
    root_path="/api/v1"
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(pokemon)


if __name__ == "__main__":

    config = uvicorn.Config(app="main:app", port=8000, reload=True)
    server = uvicorn.Server(config)
    server.run()