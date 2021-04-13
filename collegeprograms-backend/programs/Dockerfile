FROM node:12.10.0-buster

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_PATH "src/"

CMD ["npm", "start"]
