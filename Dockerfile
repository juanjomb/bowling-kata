FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install\
&& npm install typescript -g

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/src/app" ]