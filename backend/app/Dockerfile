# FROM mysql/mysql-server:latest
# ADD init-db.sql /docker-entrypoint-initdb.d/init-db.sql
# RUN chmod -R 775 /docker-entrypoint-initdb.d

# 

# WORKDIR /app
# COPY . /app

# RUN pip install --no-cache-dir -r ./app/requirements.txt

# EXPOSE 5000

# CMD ["python", "./app/app.py"]

# WORKDIR /app
# COPY . /app

# RUN pip install -r requirements.txt

# EXPOSE 5000

# CMD ["python", "app.py"]


# FROM python:3.9-slim
# EXPOSE 5000
# WORKDIR /app
# COPY . .
# COPY requirements.txt /app
# RUN pip install -r requirements.txt

# COPY app.py /app
# CMD python app.py


# FROM mysql/mysql-server:latest
# ADD init.sql /docker-entrypoint-initdb.d/init.sql
# RUN chmod -R 775 /docker-entrypoint-initdb.d

# FROM mysql/mysql-server:latest
# ADD init.sql /docker-entrypoint-initdb.d/init.sql
# RUN chmod -R 775 /docker-entrypoint-initdb.d



FROM python:3.9-slim
RUN pip install mysql-connector-python && pip install flask
WORKDIR /app
COPY app.py ./