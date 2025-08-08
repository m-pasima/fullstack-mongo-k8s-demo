FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy only package.json first for caching
COPY package.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of the app
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
