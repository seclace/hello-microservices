## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running in docker

### 0. Remove all existing containers

Container name can be one of: `redis | rabbit | lorem | math | human | hello`

```bash
$ docker stop <container name>
```

```bash
$ docker rm <container name>
```

### 1. First of all build images

```bash
$ docker build -f .\app.Dockerfile -t <your name>/hello-microservice .
```

```bash
$ docker build -f .\human-generator.Dockerfile -t <your name>/human-generator .
```

```bash
$ docker build -f .\lorem-ipsum-world.Dockerfile -t <your name>/lorem-ipsum-world .
```

```bash
$ docker build -f .\math-world.Dockerfile -t <your name>/math-world .
```

### 2. Create network

```bash
$ docker network create hello
```

### 3. Run Redis and RabbitMQ in docker

NOTE: Pull Redis and RabbitMQ images to local `docker pull redis` and `docker pull rabbitmq` if you don't.

```bash
$ docker run -itd -p 6379:6379 --network hello --name redis -h redis redis
```

```bash
$ docker run -itd -p 5672:5672 --network hello --name rabbit -h rabbit rabbitmq
```


### 4. Run microservices

NOTE: All microservices are using `.dev.env` and corresponding to redis/rabbit/math docker container names 

```bash
$ docker run --network hello -itd --name human -h human <your name>/human-generator
```

```bash
$ docker run --network hello -itd --name lorem -h lorem <your name>/lorem-ipsum-world
```

```bash
$ docker run --network hello -itd --name math -p 9001:9001 -h math <your name>/math-world
```

```bash
$ docker run --network hello -itd --name hello -p 3000:3000 -h hello <your name>/hello-microservice
```

### 5. The last thing is go to http://localhost:3000

Returns `404`:
```bash
curl -X GET http://localhost:3000
```

Returns `200`:
```bash
curl -X GET http://localhost:3000/lorem
```

Returns `200`:
```bash
curl -X GET http://localhost:3000/sum?numbers[]=1&numbers[]=2
```

Returns `200`:
```bash
curl -X GET http://localhost:3000/human
```
