FROM node:alpine

WORKDIR /usr/src/app

# Copy over package.json & package-lock.json
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
RUN npm start

