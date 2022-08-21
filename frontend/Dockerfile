FROM node:alpine

WORKDIR /app

RUN npm i -g vite

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8081

CMD ["vite"]
