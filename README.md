# Task Organizer
Project root: taskorganizer
A web app which is a task tracker/organizer like trello or jira

The app uses CI4 for backend/api and ReactJS for frontend in webpack and babel setup

# Db setup

Please check the .env file which is in the project root and please provide the connection to your mysql connection. Below are the settings that you will change the values

database.default.hostname<br />
database.default.database<br />
database.default.username<br />
database.default.password<br />
database.default.port<br />

Please do not change anything other than those settings mentioned above, thanks.

There is a file called CreateDatabase.sql in the project root. This app expects that the current environment has a mysql installed already and running.
Then please run the content of the CreateDatabase.sql file to your mysql connection.

# Db setup - migration

Then in linux shell or any shell of your own setup, make sure that you are in your current project root then run the following commands below

1. php spark migrate
2. php spark db:seed AddDefaultTaskStatusRecords

# App setup

To  build the app, follow the steps below. Please note that the steps below uses linux/ubuntu shell and commands
1. cd to taskorganizer/js
2. run 'npm install'
3. run 'npm run webpack'
4. run 'npm start' - this command will start the reactjs server and can be accessed in the browser through http://localhost:3000
5. cd to taskorganizer
6. run 'php spark serve' - this will start the backend server at http://localhost:8080

Once you finish the steps above, the site is now accessible in http://localhost:3000 and can now be used