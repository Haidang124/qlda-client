# node 16.15
# build stage
# FROM node:12.22-alpine as build-stage
# WORKDIR /app
# COPY . .
# RUN npm install

# # production stage
# FROM nginx:1.17-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]

# node 12.22
# build stage
FROM node:12.22-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
