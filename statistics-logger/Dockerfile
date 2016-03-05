FROM node:5.7.1
RUN apt-get update
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
CMD [ "bash", "run.sh" ]
