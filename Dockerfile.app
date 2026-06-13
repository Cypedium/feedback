FROM node:18 AS builder
WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build

FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
