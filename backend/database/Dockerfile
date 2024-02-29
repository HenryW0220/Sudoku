FROM mysql/mysql-server:latest
ADD init-db.sql /docker-entrypoint-initdb.d/init-db.sql
RUN chmod -R 775 /docker-entrypoint-initdb.d

FROM python:3.9-slim

# RUN apt-get update \
#     && apt-get install -y --no-install-recommends \
#        python3-pip \
#        build-essential \
#        && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]

