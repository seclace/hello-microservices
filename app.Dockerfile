FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build -- hello-microservice

CMD ["node", "dist/apps/hello-microservice/main.js"]
