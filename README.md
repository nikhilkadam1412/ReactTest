# ReactTest
This is test project using React and Node(Postgres DB).

After pulling changes from Git
# All updated data on 'main' branch.
# react project folder in 'test_ui'
# node project folder in 'test_server'

# to start React project - inside 'test_ui'
1. npm install -  to install all required packages
2. npm start -  to start the project

# to start Node project - inside 'test_server' - need database setup first
1. npm install - to install all required packages
2. node app.js - to start the node server

# Database - postgres
# to setup postgres database on system, follow below links
# for postgres installation: https://www.sqlshack.com/how-to-install-postgresql-on-windows/
# load and connect to postgres:
1. https://www.postgresqltutorial.com/load-postgresql-sample-database/
2. https://www.postgresqltutorial.com/connect-to-postgresql-database/

# the above links help you to setup postgres DB

# once install to start the postgres
1. write command 'psql' in windows search bar and open 'SQL Shell'
2. open pgAdmin 4 and use password you have entered while postgres DB installation.

# you can see my postgres database configuration in file: test_server/src/userModel.js 
# I will attack DB in email for your restoration.
# "public".add_user - you can see this text in 'test_server/src/userModel.js' file  where "public" is my schema name. and 'add_user' is table name. make sure you also use/create schema with name public Or replace your schema name with yours schema.