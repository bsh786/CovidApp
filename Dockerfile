FROM node:12

WORKDIR /app

COPY . .

RUN npm install

RUN npm install http-server -g

RUN npm run build --prod

WORKDIR  /app/dist/covid-app

ENTRYPOINT ["http-server", "-c1", "-p", "80"]
