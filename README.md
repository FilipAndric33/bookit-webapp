# MERN stack reservation app called bookit

## A fully functional web application for reservations

This project was built as a portfolio. It is a web app that can be used to browse, view and reserve apartments.
There is a registration system including authorization and authentification and based on wether the user is logged in
or not he is provided with different functionalities.

## Technology stack

### Front end

React.js used for building and managing the user interface.
React router from react-router-dom library for routing.
Date-fns and react-datepicker for date handling.

### Back end

Node.js and Express.js for server side logic.
MongoDB and Mongoose for database creation and managment.
JsonWebToken for user authentification and authorization.

## Setup and installation 

### Prerequisites

Node.js and npm installed.
MongoDB cluster set up and running.

### Installation

Clone the repo: git clone https://github.com/FilipAndric33/bookit-webapp
                cd bookit

### Install dependencies:

npm install

### Set up environment variables 

Create a .env file with variables from .env.example (use your custom values)

### Run the application 

open two terminals in the root directory. 
on the first one run: npm run start 
-This will start the client.
in the second one run: npm run dev
-This will start the server.

The application will be running on localhost:3000.

## Usage

### Browsing apartments

On the initial home page there are apartments that can be browsed. Click on the view button to see the details.

### Making reservations 

By clicking view, there is a date picker callendar on which you can pick either one date or multiple dates in a row.
The total price is written above. The starting price is one day rental price.

### Registration and log in

By opening the register form you can create an account. After account creation you can press the login option in 
the navbar which will lead to a second form. By typing in the username and password you will log in.

### Posting property

in the navbar there is an option to view profile info. After opening you will have a button that leads to the 
appartment adding form. The same can be done directly from the navbar after logging in. 