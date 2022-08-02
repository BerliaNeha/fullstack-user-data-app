# fullstack-user-data-app
An ongoing project...Some other features such as multipart requests yet to be added.
Multipart requests let you send data of multiple types in a single request (e.g. a JSON object + an image file)!

# Tech Stack
Backend routes + endpoints for various HTTP methods Controllers, Middleware, Error handling middleware, a MongoDB database + collections Mongoose methods, Mongoose models + schemas. Relations between collections, Data validation, bcrypt, Authentication with JWT Authorization, Local Storage and Cookies!

# How to use

Clone this repository or simply download all files.
git clone https://github.com/BerliaNeha/fullstack-user-data-app.git
Create two folders: backend and frontend

1. Install dependencies in root (server) and in client as well

cd backend:
npm init -y
npm install express
Check for nodemon in your system if not found then npm install nodemon

cd frontend:
npx create-react-app .

2. Add "type":"module" to the backend package.json

3. Create a .env file in root

mkdir .env

4. Copy these variables in .env file

SECRET_OR_KEY=

5. Now to run app, run this script

cd backend and run nodemon index
If database established cd frontend and run npm start


Also this project is open to everyone. If you have some ideas or features you can develop or even can modify the existing ones in a better way, just create a pull request and you can become a contributor.
