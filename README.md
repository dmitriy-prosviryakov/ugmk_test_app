# UGMK Test App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

- Clone this repository.
- Run 'npm i' command from the root to install project's dependencies.
- Install json-server 'npm install -g json-server' to be avaliable to test application locally

## Run application locally

- Run 'json-server --watch products.json --port 3001' to start json-server
- Run 'npm run start' to strart application. Application will be available at localhost:3000
## Available Scripts

- 'npm run start' - start application locally
- 'npm run dockerize' - create docker image with name ugmk_test_app
- 'npm run start-container' - start docker container ugmk_test_app. Application will be available at localhost:3000
