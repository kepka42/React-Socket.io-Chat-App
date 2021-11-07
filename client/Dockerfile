FROM node:14.15.0 AS build
WORKDIR /app
COPY . .
RUN npm install && npm build

FROM nginx:1.21.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
