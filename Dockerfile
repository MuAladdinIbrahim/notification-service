FROM node:14.16.1-alpine

WORKDIR /var/app
COPY package*.json ./
RUN npm install

COPY . .