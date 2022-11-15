
# Deall Backend Engineer Test Documentation and Report

This is the asnwer for Backend Engineer role test at Deall, created by Gatum Erlangga.

## Installation

This app is running on ```nodejs``` version ```v16.14.2```. Express and prisma are used in this project as the backend framework and ORM library. 

Database for this project is MySQL. Before running and installing this project, make sure you already have MySQL database server installed on your machine, and empty database called ```mysql-deall```.

After pulling the project via GitHub, install the required dependencies with npm

```bash
npm install
```
    
Create ```.env``` file with information below
```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
ACCESS_TOKEN_SECRET="SECRET_ACCESTOKEN_HERE"
REFRESH_TOKEN_SECRET="SECRET_REFRESH_TOKEN_HERE"
```

Description:

- ``` DATABASE_URL ``` is used to connect with database. This environment variable is required to run prisma. For more information, please visit [Prisma Database Connector Docummentation](https://www.prisma.io/docs/concepts/database-connectors/mysql). Prisma also supported Postgress, SQLite, MongoDB, CockroachDB and Microsoft SQL Server.
- ```ACCESS_TOKEN_SECRET``` and ```REFRESH_TOKEN_SECRET``` are used as a key for JWT. Library used for JWT is ```jsonwebtoken```.

After creating an environment variable, connect with the database using prisma, generate prisma client for the application and insert admin data to database with command:
```
npx prisma db push
npx prisma generate
node ./database/seed
```

Run the app using npm
```
npm run start
```
OR
```
npm run dev
```
The app will running on port 3000. Example ```localhost:3000```

## Admin Credentials
```
Application
Email: admin@admin.com
Password: 123

Database
Username: root
Password: root
```


## Architecture Design
### API Architecture Design _(with refresh token)_
![API Architecture](https://drive.google.com/uc?export=view&id=1hKC66GAIbR1NVyS6jDb-J7iOfBAoVauA)

### Docker Architecture
![Docker Architecture](https://drive.google.com/uc?export=view&id=15Bgeu3-Ce5qhhplKXF9ek1xj0ekpGjQ0)

### Kubernetes Architecture Design
![Kubernetes Architecture](https://drive.google.com/uc?export=view&id=1saQWevN45r0du4A3gr4-p-EY2Ux5xEo-)


## API Reference

### JSON Response Standart

Standart
```json
{
    "success": "Boolean",
    "Message": "String",
    "error": "String",
    "data": "Object"
}
```

JSON Response Example
```json
{
    "success": true,
    "message": "The data has been updated!",
    "data": {
        "user": {
            "name": "Gatum Erlangga ubah"
        },
        "userUpdate": {
            "id": 2,
            "name": "Gatum Erlangga ubah",
            "email": "erlanggagatum@mail.com",
            "password": "gatumgatum",
            "role": "user"
        }
    }
}
```


### 1. Authentication Handler

#### Login to application

```
  POST /auth/login
```
Body: (use ```x-www-form-urlencoded``` or ```raw``` for postman)
| Parameter  | Type     | Description                   |
| :--------  | :------- | :---------------------------- |
| `email`    | `string` | **Required**. User's  email   |
| `password` | `string` | **Required**. User's password |


#### Get refresh token
```
  POST /auth/refresh-token
```
Body: (use ```x-www-form-urlencoded``` or ```raw``` for postman)
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Refresh token given after login (```refreshToken```) |


#### Logout

```
  POST /auth/logout
```
Body: (use ```x-www-form-urlencoded``` or ```raw``` for postman)
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Refresh token given after login (```refreshToken```) |



#
### 2. User CRUD Handler

#### Retrieve all users

```
  GET /users
```
```Authenticaction Header```: Bearer accessToken 

_Header is required! Access Token is given when after login or refresh token if token is expired_


#### Retrieve specific user

```
  GET /users/:id
```
```Authenticaction Header```: Bearer accessToken 

_Header is required! Access Token is given when after login or refresh token if token is expired_


#### Create User

```
  POST /users/:id              #:id -> User's ID | integer
```
```Authenticaction Header```: Bearer accessToken 

_Header is required! Access Token is given when after login or refresh token if token is expired_

Body: ```Raw``` for postman

| Parameter  | Type     | Description                   |
| :--------  | :------- | :---------------------------- |
| `user`    | `object` or `array` of `object` | **Required**. User object   |
| `name` | `string` | **Required**. User's name |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |
| `role` | `string` | **Optional**. User's role (ONLY `user` or `admin`) |

Insert single user
```json
{
    "user": {
        "name": "User's name", 
        "email": "User's name", 
        "password": "User's name", 
        "role": "user", 
    }
}
```

Insert multiple user at once
```json
{
    "user": [
        {
            "name": "1 User's name", 
            "email": "user1@mail.com", 
            "password": "user1pass", 
            "role": "user", 
        },
        {
            "name": "2 User's name", 
            "email": "user2@mail.com", 
            "password": "user2pass",
            "role": "user",
        }
    ]
}
```

#### Update user

```
  PUT /users/:id              #:id -> User's ID | integer
```

```Authenticaction Header```: Bearer accessToken 

_Header is required! Access Token is given when after login or refresh token if token is expired_

Body: ```Raw``` for postman

| Parameter  | Type     | Description                   |
| :--------  | :------- | :---------------------------- |
| `name` | `string` | **Optional**. User's name |
| `email` | `string` | **Optional**. User's email |
| `password` | `string` | **Optional**. User's password |
| `role` | `string` | **Optional**. User's role (ONLY `user` or `admin`) |

```json
{
    "name": "User's name",
    "email": "User's name",
    "password": "User's name",
    "role": "user",
}
```


#### Delete user

```
  DELETE /users/:id              #:id -> User's ID | integer
```

```Authenticaction Header```: Bearer accessToken 

_Header is required! Access Token is given when after login or refresh token if token is expired_




## Deployment

### Using Docker Compose _(the safer way)_

```bash
  docker compose up -d
```
The app will running on port 3030. Example: ```localhost:3030```

### Using Kubernetes ```kubectl``` command

```bash
  kubectl create -f ./.kubernetes/publish.yaml
```

The app will running on port 30003. Example: ```localhost:30003```




## Author
Gatum Erlangga
- [Website](https://porto.erlanggagatum.com)
- [GitHub](https://www.github.com/erlanggagatum)
- [LinkedIn](https://www.linkedin.com/in/erlanggagatum)
- [Instagram](https://www.instagram.com/erlanggagatum)

