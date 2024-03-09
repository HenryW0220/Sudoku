# Database + Flask Setup 

## Build and Launch Containers (Ensure no containers are running)

```
docker-compose up --build
```
OR for detached
```
docker-compose up -d --build
```
MySQL container will be created along with database, then after 20 seconds, the flask container will spin up and GET data from database through the setup() function

Kill all containers using:

```
docker kill $(docker ps -q)
```

open http://localhost:5002/ to view output

