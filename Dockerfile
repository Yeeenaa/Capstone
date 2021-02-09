FROM node:12-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:js

EXPOSE 3000

CMD ["node", "./express.js"]