FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY ./sheetjs/xlsx-0.18.9.tgz ./sheetjs/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/database-fusion /usr/share/nginx/html
#ng build --prod
#docker build -t angular-nginx-image .
#docker run --name angular-nginx-container -d -p 8081:80 angular-nginx-image
