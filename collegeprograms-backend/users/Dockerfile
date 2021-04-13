FROM node:12.10.0-buster

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install

CMD ["npm", "start"]
