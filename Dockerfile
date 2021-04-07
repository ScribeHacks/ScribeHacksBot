FROM node:14-alpine

LABEL author="Kai Devrim" maintainer="kai@devrim.tech"

WORKDIR /app

COPY package.json /app

COPY . /app

RUN apk add --no-cache yarn && yarn setup && yarn run build

ENV NODE_ENV=production

CMD ["yarn", "prod"]