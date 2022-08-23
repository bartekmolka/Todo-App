# Todo App

### Written in React & Typescript, Go and PostgreSQL

---

## Preview: 
[preview.png]

## Running project

1. First step to run app is to setup enviroment variables inside .env file (you can just rename *.env.example=* to *.env*)

> **Note** Your .env file shuld look same as `.env.example` file

2. Then you have to start database by running:
```
docker-compose up --build
```

3. After that you have to install modules for your server:

```
go mod download
```

And start it by:
```
go run server.go
```
4. Last step is to install dependencies for frontend by typing:

```
yarn install
```
And start it by:

```
yarn dev
```


## Testing



---

©bartekmolka 2022
