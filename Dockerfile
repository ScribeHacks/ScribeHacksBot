FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json ./
RUN yarn install

# Our precious bot
COPY . /usr/src/bot

# Start me!
RUN yarn run start
