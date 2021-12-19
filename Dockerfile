FROM node:17-alpine3.12

WORKDIR /app

COPY . .
RUN npm install
EXPOSE 3000
CMD node build/app.js
