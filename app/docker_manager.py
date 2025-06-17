import docker
from .main import ServiceConfig

class DockerManager:
    def __init__(self):
        self.client = docker.from_env()

    def run_container(self, config: ServiceConfig):
        ports = {p.split(':')[1]: p.split(':')[0] for p in config.ports}
        container = self.client.containers.run(
            config.image,
            name=config.name,
            ports=ports,
            detach=True
        )
        return container

    def list_containers(self):
        containers = self.client.containers.list()
        return [
            {"id": c.id, "name": c.name, "image": c.image.tags}
            for c in containers
        ]

    def remove_container(self, container_id: str):
        container = self.client.containers.get(container_id)
        container.stop()
        container.remove()
