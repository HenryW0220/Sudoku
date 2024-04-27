# CS506-Team24

## Pseudoku
![Team Logo](https://git.doit.wisc.edu/cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_24/cs506-team24/-/raw/main/docs/CS506_Team_Logo.png)


## Team Members
Andrew Logan

Elaine Li

Henry Weng

Jackson Wolf

Juan Carlos Eulogio Martinez

Katherine Lesavich


## Sprints
~~Sprint 0: Feb 12-Feb 28~~

~~Sprint 1: Feb 28-Mar 13~~

~~Sprint 2: Mar 13-Apr 10~~

Sprint 3: Apr 10-Apr 29


## Scrum Masters and Product Owners
Sprint 0/1:

    Scrum Master - Andrew Logan
    
    Product Owner - Jackson Wolf


Sprint 2:

    Scrum Master - Juan Carlos Eulogio Martinez

    Product Owner - Katherine Lesavich


Sprint 3:

    Scrum Master - Elaine Li

    Product Owner - Henry Weng


## Figma Prototype
We have created a high fidelity prototype of our Sudoku application using Figma. It can be found [here](https://www.figma.com/proto/gDVxq0N7kbBzlIZ1ySW40q/issue_21?type=design&node-id=1-3&t=HqNWP6pkfUuQvsIN-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A3&show-proto-sidebar=1).


## Project Setup

### Setup Backend and Database
1. Login to csl machine `ssh <username>@cs506-team-24.cs.wisc.edu`
2. Clone repository if you have not
3. Enter backend directory `cd ~/backend`
4. `python3 -m venv venv`
5. `pip install -r requirements.txt`
6. Ensure no containers are already runnning `docker kill $(docker ps -q)`
7. Spin up backend and database containers using `docker-compose up -d --build`
8. Wait around 1 minute for containers to spin up
9. Can view Flask output for testing at `http://localhost:5002/` (**WARNING: FOR BACKEND TESTING ONLY**)
10. When finished with all development, run `docker compose down`
### Setup Frontend
1. Open a separate terminal (NOT ON CSL MACHINE)
2. Tunnel into for frontend using `ssh -L 3000:localhost:3000 -L 5002:localhost:5002 <username>@cs506-team-24.cs.wisc.edu`
3. Enter frontend directory `cd ~/frontend`
4. Run `npm install`
5. Run `npm start`
6. Open up `http://localhost:3000`