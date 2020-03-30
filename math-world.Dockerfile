FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9001

RUN npm run build -- math-world

CMD ["node", "dist/apps/math-world/main.js"]
