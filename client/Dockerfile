FROM node:18.16.0-alpine3.17



COPY src/ src/
COPY public/ public/
COPY package.json .
COPY package-lock.json .

RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]
