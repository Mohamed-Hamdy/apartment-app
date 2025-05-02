# Base Node.js image
FROM node:18 AS deps
WORKDIR /app

# Install necessary CA certificates to avoid SSL validation issues
RUN apt-get update && apt-get install -y ca-certificates

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM node:18 AS builder
WORKDIR /app

# Copy the node_modules from the previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Disable SSL verification for npm (workaround)
RUN npm config set strict-ssl false

# Disable TLS verification for Next.js build
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Build the application
RUN npm run build

# Production image
FROM node:18 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./ .next/
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port for frontend
EXPOSE 3000

# Set the environment variables
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Command to start the server
CMD ["node", "server.js"]
