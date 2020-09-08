# Local Barbershop App
<img src="preview.jpg" />

Bootstrap 4  
React, React Router, Redux, Redux Thunk  
Express.js, Mongoose  
MongoDB  
Docker

### To be able to run app, you need to take the following steps:

*  Clone repository

*  Run database (see instructions below)

*  Set up your Cloudinary to store user avatars (see instructions below)

*  Open `server` directory in terminal and run `npm install`, then `npm run server:dev`

*  Open `client` directory in separate terminal and run `npm install`, then `npm run client:dev`

*  Your default browser will automatically navigate to http://localhost:3000/

### How to run MongoDB database:

*  Install [Docker](https://www.docker.com/get-started)

*  Build and run container via instuctions in [Dockerfile](/db/Dockerfile)

### How to set up Cloudinary:

*  Create a free account on [cloudinary.com](https://cloudinary.com/)

*  Set the environment variable for the server as follows:   
`CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name`