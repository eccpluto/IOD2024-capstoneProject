# Ideo

Ideo is a simple web app designed to enable creative minds to pull together a variety of research for their studies and applications.

The app is a capstone project to encapsulate a variety of full stack technologies and design principles, including implementing MVC architecture, CRUD database interactions, RESTful server API, vendor API integration, Client-Server architechure, and the React framework.


## Installation Instructions

### Database setup.

Download a MongoDB service executable, one that you can run as a daemon on your preferred platform. When this is running, enter into the command line interface in your terminal, or if you prefer a GUI, try _MongoDB Compass_.

You will will need to create a single database (ideo_db in the .env file in this repository), and 3 collections: users, resources, libraries.

Ensure the mongoDB service is running and continue. You may need to troubleshoot your mongoDB instance if you have initial commection / permission issues (restarting your machine after installing usually helps).

### Runnning the source code

Everything you need is here on github, _including the .env file_ which typically we would not upload - and I may remove it.

Simply clone this entire repository, or choose a release package.

You will need to replicate the installation steps in each of the frontend and backend:

frontend/ideo -> run npm install, and in backend/ideo -> run npm install.

This will get your dependencies ready.

We now need to run two shell commands in parallel, to boot the backend up, ```cd``` into the backend/ideo ```dir``` and run ```npm start```. Similarly,  run ```npm run dev``` in the frontend/ide ```dir```.

Head to the address in a web browser - commuinicated back to you by the ```npm run dev``` command, and the application will be ready to enjoy.
