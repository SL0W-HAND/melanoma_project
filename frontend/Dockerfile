# 1️⃣ Build stage
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production=false

COPY . .
RUN npm run build

# 2️⃣ Runtime stage
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
