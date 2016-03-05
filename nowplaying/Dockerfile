FROM node:5.7.1
RUN apt-get update
RUN apt-get install -y mpc
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
CMD [ "npm", "start" ]
