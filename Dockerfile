FROM node:17-alpine3.12

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD node build/app.js
