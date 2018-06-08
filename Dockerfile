FROM node:alpine

EXPOSE 3000

WORKDIR /home/app
COPY . /home/app

RUN npm install
CMD npm run migrate && ./scripts/start.sh
