FROM node:19.9-alpine3.16

WORKDIR /app

ARG NODE_ENV=production

COPY ./package*.json ./

RUN npm i

COPY ./src src/
COPY ./css css/
COPY ./views views/
COPY ./config.js ./

CMD [ "npm", "run", "server" ]
