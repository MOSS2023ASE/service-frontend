FROM node:16
WORKDIR /app
COPY . .

RUN npm install -g npm@9.6.4 \
    && npm install \ 
    && npm run build:prod

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
