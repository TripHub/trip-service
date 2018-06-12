FROM node:alpine

EXPOSE 3000

WORKDIR /usr/src/app

ADD ./package*.json ./
RUN npm install

COPY . .

CMD npm run migrate && ./scripts/start.sh
