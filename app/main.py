from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import docker

from .docker_manager import DockerManager

app = FastAPI(title="Server Manager")
manager = DockerManager()

class ServiceConfig(BaseModel):
    name: str
    image: str
    ports: List[str] = []  # format "host_port:container_port"

@app.get("/services")
def list_services():
    return manager.list_containers()

@app.post("/services")
def create_service(config: ServiceConfig):
    try:
        container = manager.run_container(config)
        return {"id": container.id, "name": container.name}
    except docker.errors.DockerException as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/services/{container_id}")
def remove_service(container_id: str):
    try:
        manager.remove_container(container_id)
        return {"status": "removed"}
    except docker.errors.DockerException as e:
        raise HTTPException(status_code=400, detail=str(e))
