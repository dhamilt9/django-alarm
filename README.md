# Crowdsourced Alarm Clock

## A frontend and api for a raspberry pi alarmclock (code for that soon to come)

dev server currently located at 54.173.137.49

## REQUIREMENTS

Python 3.5.2

Pipenv

Node.js/npm

PostgreSQL

```
sudo apt-get install libpq-dev postgresql postgresql-contrib
sudo su - postgres
psql
CREATE DATABASE alarm;
CREATE USER user WITH PASSWORD 'password';
ALTER ROLE user SET client_encoding TO 'utf8';
ALTER ROLE user SET default_transaction_isolation TO 'read committed';
ALTER ROLE user SET timezone TO 'EST';
GRANT ALL PRIVILEGES ON DATABASE alarm TO user;
\q
exit
```

## SETUP

```
pipenv install
npm install
```

copy the following to .../django-alarm/alarm/alarm/settings_secret.py, replaced with your values:

```
SEC_KEY = 'secret_key'
PSQL_USER = 'user'
PSQL_PASS = 'password'
HOSTS = ['host1', 'host2']
```

## RUN DEV SERVER
```
pipenv shell
python alarm/alarm/manage.py migrate
python manage.py loaddata seeddata.json
npm start
```
