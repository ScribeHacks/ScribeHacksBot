FROM node:14-alpine

LABEL author="Kai Devrim" maintainer="kai@devrim.tech"

WORKDIR /app

COPY package.json /app

COPY . /app

RUN mkdir -p /app \
    && apk add --no-cache yarn

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn install && \
    yarn run build && \
    yarn run prod

ENV NODE_ENV=production

CMD ["yarn", "start"]
