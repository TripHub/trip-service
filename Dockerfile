FROM node:alpine

EXPOSE 3000 9229

COPY . /home/app
WORKDIR /home/app

RUN npm install
CMD npm run migrate && ./scripts/start.sh
