If you have encountered this error while working on the CSL machine:
    
    docker.errors.DockerException: Error while fetching server API version: HTTPConnection.request() got an unexpected keyword argument 'chunked'

Try cloning the repository on your local machine and working from there. That has been a verified solution for some teammates.

After moving to the local machine, some have encountered this error:

    Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:3306 -> 0.0.0.0:0: listen tcp 0.0.0.0:3306: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.

To resolve this, run to the following command to determine the PID of the process using port 3306:

    netstat -ano | findstr :3306

From there, you need to end the process. You can do so in one of two ways. Either run the following command:

    taskkill /PID ____ /F

or open Task Manager -> Go to Details tab -> Find process with PID ____ -> Right-click and End Process

You can then rebuild with

    docker-compose up -d --build
