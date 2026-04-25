FROM node:18 as build

WORKDIR /app

COPY package*.json ./

# clean install (IMPORTANT FIX)
RUN npm ci

COPY . .

RUN chmod -R 777 node_modules

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
