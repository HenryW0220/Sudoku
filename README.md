# CS506-Team24

## Pseudoku
![Team Logo](https://git.doit.wisc.edu/cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_24/cs506-team24/-/raw/main/docs/CS506_Team_Logo.png)

## Team Members
Andrew Logan

Elaine Li

Henry Weng

Jackson Wolf

Juan Carlos Eulogio Martinez (Current Scrum Master)

Katherine Lesavich (Current Product Owner)

## Sprints
~~Sprint 0: Feb 12-Feb 28~~

~~Sprint 1: Feb 28-Mar 13~~

-> Sprint 2: Mar 13-Apr 10

Sprint 3: Apr 10-Apr 29


## Project Setup

### Setup Backend
1. Login to csl machine `ssh <username>@cs506-team-24.cs.wisc.edu`
2. Clone repository if you have not
3. Enter backend directory `cd ~/backend`
4. Ensure no containers are already runnning `docker kill $(docker ps -q)`
5. Spin up backend and database containers using `docker-compose up -d --build`
6. Wait around 1 minute for containers to spin up
7. Open a separate terminal (NOT ON CSL MACHINE)
8. Tunnel into for frontend using `ssh -L 3000:localhost:3000 -L 5002:localhost:5002 <username>@cs506-team-24.cs.wisc.edu`
9. Enter frontend directory `cd ~/frontend`
10. Run `npm install`
11. Run `npm start`
12. Open up `http://localhost:3000`