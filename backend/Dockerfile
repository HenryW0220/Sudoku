# FROM mysql/mysql-server:latest
# ADD init-db.sql /docker-entrypoint-initdb.d/init-db.sql
# RUN chmod -R 775 /docker-entrypoint-initdb.d

# FROM python:3.9-slim


# WORKDIR /app
# COPY . /app

# RUN pip install --no-cache-dir -r requirements.txt

# EXPOSE 5000

# CMD ["python", "app.py"]

FROM python:3.9-slim

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]