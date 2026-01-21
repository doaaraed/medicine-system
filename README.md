# ZMedicine System API

ZMedicine System is a backend RESTful API designed to manage medicines, pharmacies, alternative medicines, and user authentication.  
The system helps users find available medicines, pharmacies, and suitable alternatives when a medicine is not available.

This project is containerized using Docker to ensure easy setup, a consistent runtime environment, and reproducibility for any developer.

---

## Features

- User authentication (signup & login)
- Manage medicines (add, update, delete, list)
- Manage pharmacies
- Manage alternative medicines
- RESTful API design
- Dockerized for easy deployment

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Docker

---

### Build the Docker image

docker build -t zmedicine-system .

---

## Run the container

docker run -p 5000:5000 --env-file .env zmedicine-system

---

## Run with Docker Compose

docker compose up --build
docker compose down

---

### Makefile
The project includes Makefile to simplify Docker commands:
- make build
- make run
- make stop
---

### How to stop container and clean up
1-Show all running containers:
docker ps
2-Stop the running container
docker stop <container_name_or_id>

---

## API Testing

Use Postman to test endpoints such as:
- POST /auth/signup
- POST /auth/login
- GET /medicines
- POST /medicines/add
- GET /pharmacies
- POST /pharmacies/add
- GET /alternatives

---

## Project Structure
zmedicine-system/
│
├── configurations/
│   ├── db.js            # MongoDB database connection 
│   └── index.js        
│
├── controllers/         # Application logic
│   ├── auth.js          # User authentication (signup & login)
│   ├── medicine.js      # Medicine management logic
│   ├── pharmacy.js      # Pharmacy management logic
│   ├── alternative.js  # Alternative medicine logic
│   └── index.js         # Export controllers
│
├── middlewares/
│   └── index.js         # Application middlewares (auth, error handling)
│
├── models/             
│   ├── index.js
│   ├── User.js          # User schema
│   ├── Medicine.js      # Medicine schema
│   └── Pharmacy.js      # Pharmacy schema
│
├── routes/              # API route definitions
│   ├── auth.js          # Authentication routes
│   ├── medicine.js      # Medicine routes
│   ├── pharmacy.js      # Pharmacy routes
│   ├── alternative.js  # Alternative medicine routes
│   └── index.js         # Route aggregation
│
├── docs/
│   ├── screenshots/     # Project screenshots 
│   └── notes.md        
│
├── my_modules/          # Project dependencies
│    
├── .env.example         # Environment variables example
├── .gitignore           # Git ignored files
├── .dockerignore        # Docker ignored files
│
├── app.js               # import Express application 
├── index.js             # Main file to start project
├── createuser.js        # User creation script
├── Dockerfile           # Docker configuration
└── README.md            # Project documentation
