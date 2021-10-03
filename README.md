# RESTful Todolist :tada:
[![wakatime](https://wakatime.com/badge/user/8cc0a80a-7a1a-448c-8c5e-742ed9a33792/project/59485b0f-71d2-4a2a-88d4-8e43b292df09.svg)](https://wakatime.com/badge/user/8cc0a80a-7a1a-448c-8c5e-742ed9a33792/project/59485b0f-71d2-4a2a-88d4-8e43b292df09)

This is a side project for learning the web.

## How to build :hammer:

This project was made with the monorepo architechture:

### Prerequisites

- [node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/) (recommended) or [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

#### Install the dependencies

Go to the directories backend, frontend, shared and run this command on every folder

```bash
yarn install
```

#### Create .env file for backend

Create a .env in the backend directory and populate these fields:

- MONGO_URI
- MONGO_PORT
- FRONTEND_URI
- FRONTEND_PORT
- SESSION_SECRET
- COOKIE_NAME
- PORT
- DATABASE_NAME
- EMAIL_USER
- EMAIL_PASSWORD

Update the [`Constants.ts`](frontend/src/utils/Constants.ts) file on the frontend accordingly.

#### Start the MongoDB

Host MongoDB on your local machine on the default port with

```bash
mongod
```

#### Start the frontend and backend

On the backend and frontend directories execute

```bash
yarn build
```

### RESTful Todolist was created with

- TypeScript
- TailwindCSS
- Next.js
- express.js
- MongoDB
- Node.js
- REST API
