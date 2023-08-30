# Encrypted Timeseries Project

This project demonstrates the creation of an encrypted data stream, transmission over sockets, decryption, storage in a MongoDB time-series collection, and real-time display in a frontend application.

## Folder Structure

encrypted-timeseries/
|-- backend/
| |-- emitter/
| | |-- data.json
| | |-- emitter.js
| |
| |-- listener/
| |-- listener.js
|
|-- frontend/
| |-- index.html
| |-- main.js
|
|-- docker-compose.yml
|-- README.md

## Backend

### Emitter Service

The emitter service generates and emits encrypted data streams to the listener service.

- `data.json`: Contains predefined data entries.
- `emitter.js`: Periodically generates encrypted messages and emits them over a socket.

### Listener Service

The listener service listens for incoming encrypted data streams, decrypts and validates the data, and stores it in a MongoDB time-series collection.

- `listener.js`: Listens for incoming data, decrypts, validates, and stores in MongoDB.

## Frontend

The frontend displays the real-time data received from the backend.

- `index.html`: HTML structure for displaying data.
- `main.js`: JavaScript to listen for updates and update the UI.

## Docker Compose

The `docker-compose.yml` file defines services for the backend, MongoDB, and frontend, allowing for easy deployment.

## Setup

1. Clone this repository.
2. Install Docker and Docker Compose if not already installed.
3. Navigate to the project folder and run `docker-compose up` to start the application.
4. Access the frontend UI by opening a web browser and going to `http://localhost`.