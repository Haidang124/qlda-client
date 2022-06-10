# node 16.15
# build stage
FROM node:16.15-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install

# # # production stage
FROM nginx:1.22 as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]


# node 12.22
# build stage
# FROM node:12.22-alpine as build-stage
# WORKDIR /app
# COPY . .
# RUN npm install

# # production stage
# FROM nginx:1.22 as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/nginx.conf
# RUN rm /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]
