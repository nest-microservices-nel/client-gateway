FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# la seleccion EXPOSE tiene funcionalidad en ciertos casos, por ejemplo si hay un docker-compose.yml la seleccion EXPOSE 
# deja de "funcionar" o pasa a un segundo plano. Puede ser simplemente documentacion y/o sistema de comunicacion interna.
EXPOSE 3000

ENV PORT=3000
