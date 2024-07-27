# Ideo


Ideo is a simple web app designed to enable creative minds to pull together a variety of research for their studies and applications.

The app is a capstone project to encapsulate a variety of full stack technologies and design principles, including implementing MVC architecture, CRUD database interactions, RESTful server API, vendor API integration, Client-Server architechure, and the React framework.

![image](https://github.com/user-attachments/assets/d00c7a9c-d407-44f9-9e9a-19d17e71fbee)

### User Flow:

You can start browsing millions of articles straight away, by opening the search sidebar by clicking the magnifying glass in the top right. Result cards can be opened in an embedded window in Ideo, or in a new tab - depending on which button you click on the result.

You will notice the locak search option is unavailable. This is because it would allow you to search a user library, which you can get access to when you have created an account and logged in.

To create an account, open the menu by clicking the top left hanburger icon, and selecting login. Select create an account, and upon successfull login, you will be able to access you library under the same hamburger menu.

Your library will initially be empty - but you can fill this up by searching using the search bar (as before), and adding them using the (now available) plus button on each card. Duplicate adds will not case a problem, but these will be ignored.

You can create multiple accounts, and each account will store a reference to the same resource if multiple accounts want this in their libraries.

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

We now need to run two shell commands in parallel, to boot the backend up, ```cd``` into the backend/ideo ```dir``` and run ```npm start```. Similarly,  run ```npm run dev``` in the frontend/ideo ```dir```.

Head to the address in a web browser - commuinicated back to you by the ```npm run dev``` command, and the application will be ready to enjoy.
