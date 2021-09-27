FROM node:16

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn --non-interactive

COPY . ./

CMD ["yarn", "run", "start"]
