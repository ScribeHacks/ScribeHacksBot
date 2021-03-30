FROM node:14-alpine

LABEL author="Kai Devrim" maintainer="kai@devrim.tech"

RUN mkdir -p /app \
    && apk add --no-cache yarn

WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN /usr/local/bin/yarn install

COPY . /app

ENV NODE_ENV=production

ENTRYPOINT ["/usr/local/bin/yarn"]
CMD ["yarn", "start"]
