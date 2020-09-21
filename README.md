## About this project

The purpose of this project is to apply the main concepts of a Node.js, Mongoose, and Express Bootcamp course and put them into practice in a functional application. The concept of this application is a tourism agency that offers a variety of tours, in which tourists can see details of these, make reservations, and interact with tour guides. Please note that the project is not finished yet.

## Development environment

This project is built using Node.js, Express.js framework, Mongo DB, and Mongoose package. 

## Start server locally

To start the server locally, follow these steps:

1. Run: `git clone https://github.com/Yordi23/Node.js_Course.git`
2. Create a .env file on the `root` path.
3. Add `DATABASE_HOST`, `DATABASE_HOST_LOCAL`, `DATABASE_PASSWORD`, `DATABASE_NAME` variables and, according to your database, assign values to those variables. `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_COOKIE_EXPIRES_IN`   variables are needed for authentication functions. Also `EMAIL_USERNAME`, `EMAIL_PASSWORD`, `EMAIL_HOST`, `EMAIL_PORT` are needed if you want to use a service like [mailtrap](https://mailtrap.io/) for catching emails from functionalities like the *forgotPassword* one.
3. Run: `npm install`
4. Run: `npm run start`

The server will be running by default on `127.0.0.1:3000` 

## Project on Heroku
The project is also hosted on Heroku, using the following URL you can send requests to it:
[`https://node-tours.herokuapp.com/`](https://node-tours.herokuapp.com/)

Please note that it may be possible that once you send the first request, the server may be inactive (due to Heroku free plan limitations), so you'll have to wait a few seconds for it to successfully start.

## Project Layout

* Controllers are in `/controllers`
* DB Models are in `/models`
* Express routes for endpoints are in `/routes` 
* Auxiliar functions are in `/utils`

## Endpoints

[Here](https://documenter.getpostman.com/view/10986690/TVKBZeKA) is some preliminary documentation of the available endpoints , sorry for the lack of details about how to use each one, in the future more information will be added.

