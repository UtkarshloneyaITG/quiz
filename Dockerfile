# ===========================
# Stage 1: Build client (React/Vite)
# ===========================
FROM node:18 AS client-build
WORKDIR /app

# Copy package files (root)
COPY package*.json ./

# Install dependencies (only once for both client & server)
RUN npm ci

# Copy entire project (client + server)
COPY . .

# Build the Vite client
RUN npm run build

# ===========================
# Stage 2: Production image (Node/Express)
# ===========================
FROM node:18 AS server
WORKDIR /app

# Copy only needed files from previous stage
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built app and server files
COPY --from=client-build /app ./

# Expose app port
EXPOSE 5000

# Set NODE_ENV
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]
