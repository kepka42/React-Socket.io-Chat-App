FROM node:14.15.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV PGHOST="localhost"
ENV PGUSER="postgress"
ENV PGPASSWORD="postgress1"
ENV PGDATABASE="postgres"
ENV PGPORT="5432"
ENV PORT_WS="8081"
ENV PORT_API="80"

EXPOSE 80 8081
CMD [ "node", "index.js" ]