# Database Setup

Create a file called `t24_pass.env` in /database directory and create MYSQL_ROOT_PASSWORD environment variable using

`MYSQL_ROOT_PASSWORD='password'`

Contact Andrew for password

## Build Container

```
docker build -t t24_password .
```

## Launching Container

```
docker compose -f db_mysql.yml --env-file t24_pass.env -p t24_pass up -d
```

## Run MySQL

```
mysql -h localhost -P 53316 --protocol=TCP -u root -p
```