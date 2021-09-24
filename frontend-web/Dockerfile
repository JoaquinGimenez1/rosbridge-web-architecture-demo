FROM node:15.14.0-buster-slim

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn --non-interactive

COPY . ./

CMD ["yarn", "run", "start"]