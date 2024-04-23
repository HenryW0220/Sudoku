FROM python:3.9-slim
RUN pip install mysql-connector-python && pip install flask && pip install flask_cors && pip install flask_jwt_extended && pip install werkzeug
WORKDIR /app
COPY . .