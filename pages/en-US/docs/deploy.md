# Deployment

## Java Images
### Running Container Images Using Docker-Compose
Configure the database address in docker-compose.yml.

Run the following command:
`docker-compose up -d`


### Creating Base Images
Compilation requires JDK environment, but the final runtime only needs JRE environment.

Using mvnw avoids dependencies on Maven images during compilation, significantly reducing the image file size.

Create the base image:
`docker build -t openmeta/base_image:v1 -f deploy/base_image/Dockerfile .`


### Creating Business Service Images
Business service images depend on the base image.

Create the business service image:
`docker build -t openmeta/core:v1 -f core/Dockerfile .`
