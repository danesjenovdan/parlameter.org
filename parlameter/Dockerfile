# ---
# build stage image
# ---
FROM node:26-alpine AS build

# set current directory
WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy all files and run build
COPY . .
RUN npm run build

# ---
# actual image
# ---
FROM nginx:alpine

# copy built files from the 'build' container into the nginx container
COPY --from=build /app/dist /usr/share/nginx/html
