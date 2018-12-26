FROM node:9.6.1-alpine

WORKDIR /usr/app/bubblegum

COPY package*.json ./

RUN npm install

COPY . /usr/app/bubblegum/

RUN ["mv", "stateAndHost.json", "/usr/app/bubblegum/bubble-dash/src"]

EXPOSE 3000
EXPOSE 3001
EXPOSE 9091

WORKDIR /usr/app/bubblegum 

CMD ["sh", "launch.sh"]