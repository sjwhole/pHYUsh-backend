FROM node:17-alpine3.12

WORKDIR /app

COPY package.json .
COPY build/ build/
COPY prisma/ prisma/
COPY .env .
RUN npm install
EXPOSE 3000
CMD node build/app.js
