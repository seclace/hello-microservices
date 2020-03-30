FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- lorem-ipsum-world

CMD ["node", "dist/apps/lorem-ipsum-world/main.js"]
