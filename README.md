# Hello this is simple guide how to start up project from scratch

#### In folder ./task you can find Technical and task the I created to myself to have a plan

#### I am a little bit change initial requirements to make project interesting for me) So sorry that the project does not fully and clearly meet your requirements 


## There are two-way of run: 
- ### CONTAINER:  whole in docker BE and BD will up thrue docker and docker compose (No ability to run e2e test locally)
- ### LOCAL_BE_WITH_DOCKER_DB:  db in docker and BE app on local machine (You can go through request with debugger and inspect all part of BE using e2e)

#### Prerequisite:
- installed nvm
- nestjs/cli
- installed docker and docker compose
- ability to add config in system file /etc/hosts (Needed only for LOCAL_BE_WITH_DOCKER_DB way)

---
### Get repo locally
```bash
git clone https://github.com/FreyDv/login-user.git
```
#### Change branch 
```bash
git git checkout fans-crm
```
---
### Prepare environment for run 
```bash
nvm use 20.10.0
```
```bash
npm i @nestjs/cli -g
```
---
#### Create mock .env file fro local demonstration
```bash
echo "PORT=3000
JWT_SECRET=XmOLkLnbgUlgdo8768TBbLm3NISVRjxR
DB_HOST=db
DB_PORT=3306
MYSQL_DATABASE=lu
MYSQL_ROOT_PASSWORD=sudolu
MYSQL_USER=lu
MYSQL_PASSWORD=lu
DEBUG=false" >> be/.env
```
---
## LOCAL_BE_WITH_DOCKER_DB
#### Change Directory to BE (all next command should run under be dir)
```bash
cd be
```
#### Install dependency 
```bash
npm i 
```
---
#### Add this line to your hosts file to allow BE have access to your DB in container
```bash
sudo echo "127.0.0.1 db" > /etc/hosts
````
Or 
```bash
sudo nano /etc/hosts and add next line manually
127.0.0.1 db
```
---
#### Up Database in container
```bash
npm run up:db
```
#### Start App in debug mode you can connect to debug process based on you default debug port address
```bash
npm run start:debug
```

## Run in CONTAINER
#### Change Directory to BE (all next command should run under be dir)
```bash
cd be
```
#### Install dependency
```bash
npm i 
```

#### Run container with DB
```bash
npm run up:db
```

#### Run Wait script for DB
```bash
npm run wait:db
```

#### Run container with BE
```bash
npm run up:be
```


# Finally Visit OpenApi Swagger Documentation on local address 
## http://localhost:3000/docs


