Error on CSL machine:
    docker.errors.DockerException: Error while fetching server API version: HTTPConnection.request() got an unexpected keyword argument 'chunked'

Verified solution:
    Clone repository on local machine

Error:
    Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:3306 -> 0.0.0.0:0: listen tcp 0.0.0.0:3306: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.

Verified solution:
    netstat -ano | findstr :3306

Determine the PID of the process using port 3306

Either:
    taskkill /PID ____ /F

or open Task Manager -> Go to Details tab -> Find process with PID ____ -> Right-click and End Process

Rebuild with
    docker-compose up -d --build
