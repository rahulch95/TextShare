TextShare
=========
## What is TextShare?
TextShare is an online open-source shared text editor that runs on Node.js and Socket.io. 
It is currently under development, future implementation will redesign the web pages, the UI as well as add a lot of features.
The current implementation is just a test design and a way for me to get familiar with Node.js and Socket.io.
Use the url generator on the main page to generate a new textpad for you (or just type in your URL it's upto you). Type it and share the url with anyone (they will be able to edit it too).
## How do I use TextShare?
Access the running sample:
```
http://textshare.elasticbeanstalk.com/
``` 
Or for your own Shared Text Editor, once you have cloned the repositiory (recommended: and deleted your **.git** file), run
```
sudo npm install
```
```
bower install
```
```
node server.js
```
Set up your own link, as well as your username and password for your MondoDB database in the server.js file where indicated.
This will obviously run only on localhost:5000, so if you want it up on the internet you could use a Node.js hosting service or Amazon Web Services. Use Amazon's Elastic Beanstalk ( http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html ) to easily set up a Node.js app. As a headsup, Heroku will not work with this app because of a conflict between Socket.io and Heroku servers.
## Back-end
The server runs on Node.js and uses the ExpressJS framework. I am using EJS instead of JADE as the current templating engine as I find the syntax for EJS more efficient and less confusing. Most of the communication between server and clients is done via sockets (Socket.io).
## Software Stack and Support Tech
- Node.js
- EJS
- JavaScript
- JQuery
- MongoDB
- Mongoose
- MongoLab

## What will be added soon?
- Front-end.
- BootStrap.
- Cleaner Code.
- More tools to make it text-editor like (font size options, font options).
