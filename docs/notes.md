## Docker
The application is containerized using Docker.
The Dockerfile installs dependencies and runs the Node.js application inside a container.

During the Docker build process, the main challenge was the slow download of the Node.js base image.
This was resolved by waiting for the image pull to complete and reusing cached layers in future builds.

## Docker Compose
Docker Compose was added to simplify running the application with a single command.

## Git & GitHub
I learned how to:
- Track files using Git
- Ignore unnecessary files using .gitignore and .dockerignore
- Commit changes properly
- Push updates to GitHub
- Update the repository after adding Docker-related files and documentation

## Challenges Faced During Deployment

During the deployment of the project to a production environment using Back4App as a VPS, I faced several challenges.

One of the main issues was that after deploying the project and making it publicly accessible, the application could no longer connect to the MongoDB Atlas database. This was due to network and access restrictions from the VPS environment, which prevented the container from reaching the remote database.

Another challenge was making the backend accessible to real users. Initially, the project was tested only using Postman, but for a production environment, a simple frontend interface was needed so users could interact with the system.

I also faced some difficulties with Docker builds and deployments, especially with long image downloads and ensuring that the correct ports were exposed and listening inside the container.

## How These Challenges Were Solved

To solve the database connection problem, I migrated the medicine, pharmacy, and alternative data into CSV files and stored them in the project under a data folder. The backend was modified to read data from these CSV files instead of relying on MongoDB. This allowed the application to work reliably inside the Docker container without external database access.
This made the project more user-friendly and suitable for a deployed environment.

Docker Compose and a Makefile were also added to simplify building, running, and stopping the containers with simple commands. This reduced manual errors and made deployment easier.

Finally, I used Back4App to deploy the Dockerized project and expose it through a public URL, verifying that the system works correctly in a real production-like environment.
