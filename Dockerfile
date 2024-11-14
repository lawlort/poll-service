FROM node:20

RUN apt-get update && apt-get install -y curl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 6003
CMD ["node", "-r", "newrelic", "dist/main"]
