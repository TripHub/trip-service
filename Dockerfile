FROM node:alpine

EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

RUN npm install

CMD npm run migrate && ./scripts/start.sh
