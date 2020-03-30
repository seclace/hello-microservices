FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- human-generator

CMD ["node", "dist/apps/human-generator/main.js"]
