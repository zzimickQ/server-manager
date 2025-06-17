# Server Manager

Server Manager is a backend application that deploys and manages other services and frontend apps on a server. It uses Docker for containerization and generates nginx configuration to forward traffic to each service.

## Features

- REST API to manage configuration
- Automatically manages Docker containers
- Generates nginx configuration
- Simple frontend to view current configuration

## Development

```
npm install
npm start
```

The server runs on port `3000` by default.

Configuration is stored in `config/config.json`.
