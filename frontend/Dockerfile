FROM node:20-alpine

WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY package*.json ./

RUN npm install