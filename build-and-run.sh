#!/bin/bash

# Remove all containers
docker stop redis && docker rm redis
docker stop rabbit && docker rm rabbit
docker stop lorem && docker rm lorem
docker stop math && docker rm math
docker stop human && docker rm human
docker stop hello && docker rm hello

# Build all images
docker build -f app.Dockerfile -t seclace/hello-microservice .
docker build -f human-generator.Dockerfile -t seclace/human-generator .
docker build -f lorem-ipsum-world.Dockerfile -t seclace/lorem-ipsum-world .
docker build -f math-world.Dockerfile -t seclace/math-world .

# Create network
docker network create hello

# Run Redis and RabbitMQ
docker run -itd -p 6379:6379 --network hello --name redis -h redis redis
docker run -itd -p 5672:5672 --network hello --name rabbit -h rabbit rabbitmq

# Run microservices
docker run --network hello -itd --name human -h human seclace/human-generator
docker run --network hello -itd --name lorem -h lorem seclace/lorem-ipsum-world
docker run --network hello -itd --name math -p 9001:9001 -h math seclace/math-world
docker run --network hello -itd --name hello -p 3000:3000 -h hello seclace/hello-microservice
