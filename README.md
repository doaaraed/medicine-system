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

## Production Deployment (VPS)

This project is deployed to a production environment using **Back4App**, which provides a VPS-style Docker hosting service.

Instead of manually installing Docker on a server, the GitHub repository was connected directly to Back4App.  
Back4App automatically pulls the code, builds the Docker image using the `Dockerfile`, and runs the container.
## Steps:

Connect Back4App to GitHub.

Select the repository: doaaraed/medicine-system

Choose the branch (example: master).

Set the application port to 5000.

Create deployment → Back4App builds the Docker image automatically and generates a public URL.

---
## Updates During Deployment
During the deployment process, several important updates were made to ensure the system works correctly in a production environment.

## Removing MongoDB Dependency

Originally, the project was using MongoDB Atlas as the main database.
After deploying the project on Back4App, database connection issues appeared due to network restrictions and environment variable limitations.

To solve this, the backend was redesigned to no longer depend on MongoDB

## Using CSV Files as the Data Source

A new data/ folder was added to the project.
All system data is now stored in CSV files:

main_medicines.csv

pharmacies.csv

alternative_medicines.csv

The backend was modified to read data directly from these CSV files instead of MongoDB.
This change made the system:

Fully self-contained

Easier to deploy on any VPS or Docker platform

Independent of external database services

## Adding a Frontend Interface

A simple frontend was added using HTML inside the public folder

---


### Production URL

The live deployed version of the project is available at:

https://medicine21-l64ymwst.b4a.run/

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
