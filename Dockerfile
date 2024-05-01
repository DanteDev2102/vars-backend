FROM node:18

USER root

WORKDIR /app

COPY . .

RUN yarn install