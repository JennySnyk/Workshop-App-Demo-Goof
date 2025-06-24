# Using an old, vulnerable base image for demonstration
FROM node:10-alpine

WORKDIR /usr/src/app

# Copy application files
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
