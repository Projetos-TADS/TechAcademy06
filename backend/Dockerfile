FROM node:23

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

EXPOSE 3000

CMD sh -c "until nc -z $DB_HOST $DB_PORT; do echo 'Aguardando o banco de dados...'; sleep 2; done && npm run build && npm run migrate:undo:all && npm run migrate && npm run seed && npm run dev"
