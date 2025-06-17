# Server Manager

Server Manager is a backend application that orchestrates Docker containers and configures Nginx as a reverse proxy. It exposes a REST API that can be used to manage services. A lightweight frontend can be built separately to consume this API.

## Features

- Deploy backend or frontend apps as Docker containers.
- Automatically forward requests through Nginx.
- Designed to grow as more features are added.

## Development

Requirements:
- Docker and Docker Compose

Run the stack locally:

```bash
docker-compose up --build
```

The API will be available at `http://localhost:80`.

## Project Structure

- `app/` – FastAPI application and Docker management logic.
- `nginx/` – Default Nginx configuration used in development.
- `frontend/` – Placeholder for a future web interface.

## API Endpoints

- `GET /services` – list running containers
- `POST /services` – create a new container
- `DELETE /services/{id}` – remove a container

These endpoints provide a minimal interface for managing containers. More functionality will be added as the project evolves.
