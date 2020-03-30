#!/bin/bash

# Varibales
USER_NAME=seclace

NETWORK_NAME=hello
REDIS_SERVICE_NAME=redis
RABBITMQ_SERVICE_NAME=rabbit
LOREM_SERVICE_NAME=lorem
MATH_SERVICE_NAME=math
HUMAN_SERVICE_NAME=human
HELLO_SERVICE_NAME=hello

# Remove all containers
docker stop $REDIS_SERVICE_NAME && docker rm $REDIS_SERVICE_NAME
docker stop $RABBITMQ_SERVICE_NAME && docker rm $RABBITMQ_SERVICE_NAME
docker stop $LOREM_SERVICE_NAME && docker rm $LOREM_SERVICE_NAME
docker stop $MATH_SERVICE_NAME && docker rm $MATH_SERVICE_NAME
docker stop $HUMAN_SERVICE_NAME && docker rm $HUMAN_SERVICE_NAME
docker stop $HELLO_SERVICE_NAME && docker rm $HELLO_SERVICE_NAME

# Build all images
docker build -f app.Dockerfile -t $USER_NAME/hello-microservice .
docker build -f human-generator.Dockerfile -t $USER_NAME/human-generator .
docker build -f lorem-ipsum-world.Dockerfile -t $USER_NAME/lorem-ipsum-world .
docker build -f math-world.Dockerfile -t $USER_NAME/math-world .

# Create network
docker network create $NETWORK_NAME

# Run Redis and RabbitMQ
docker run -itd -p 6379:6379 --network $NETWORK_NAME --name $REDIS_SERVICE_NAME -h $REDIS_SERVICE_NAME redis
docker run -itd -p 5672:5672 --network $NETWORK_NAME --name $RABBITMQ_SERVICE_NAME -h $RABBITMQ_SERVICE_NAME rabbitmq

# Run microservices
docker run --network $NETWORK_NAME -itd --name $HUMAN_SERVICE_NAME -h $HUMAN_SERVICE_NAME $USER_NAME/human-generator
docker run --network $NETWORK_NAME -itd --name $LOREM_SERVICE_NAME -h $LOREM_SERVICE_NAME $USER_NAME/lorem-ipsum-world
docker run --network $NETWORK_NAME -itd --name $MATH_SERVICE_NAME -p 9001:9001 -h $MATH_SERVICE_NAME $USER_NAME/math-world
docker run --network $NETWORK_NAME -itd --name $HELLO_SERVICE_NAME -p 3000:3000 -h $HELLO_SERVICE_NAME $USER_NAME/hello-microservice
