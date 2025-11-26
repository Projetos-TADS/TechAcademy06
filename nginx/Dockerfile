FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY server.crt /etc/ssl/certs/server.crt
COPY server.key /etc/ssl/private/server.key

EXPOSE 80 443