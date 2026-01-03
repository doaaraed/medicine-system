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
