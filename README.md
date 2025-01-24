# URL Shortener

This application allows users to create short versions of links to make them easier to speak and share.

## Setup

First, clone the repository.

The application is managed with `yarn`.

```bash
$ git clone <repository>
$ cd shortener

# start server
$ cd server
$ yarn install & yarn start
$ cd ..

# start client
$ cd client
$ yarn install & yarn start
$ cd ..
```

You can now run the application on `http://localhost:3000`.

The application is containerized with `docker`, and you can just run the application with Docker.

```bash
# start the app
$ docker-compose up --build
# shutdown the app
$ docker-compose down
```

## Functionalities

- Basic user Authentication.
- Autherization with JWT tokens.
- CRUD for shorten URLs.
- Browse with shorten URL in browser.

### Technologies used

- Language: TypeScript
- Framework: React.js, Express.js
- Database: PostgreSQL
- Containerize: Docker