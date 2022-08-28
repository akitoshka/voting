FROM node:latest

COPY ./dist /app
COPY ./node_modules /app
COPY package*.json /app
COPY .env /app

WORKDIR /app

RUN npm install

EXPOSE 8000

CMD ["node", "index.js"]