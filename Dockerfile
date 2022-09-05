FROM node:latest

COPY ./dist /app
COPY ./node_modules /app/node_modules
COPY .env /app

WORKDIR /app

EXPOSE 8000

CMD ["node", "index.js"]