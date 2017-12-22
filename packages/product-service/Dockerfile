FROM node:alpine

WORKDIR /usr/app

# Copy over package.json & package-lock.json
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080

