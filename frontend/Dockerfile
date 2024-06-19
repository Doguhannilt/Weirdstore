# frontend/Dockerfile
FROM node:alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Run the development server
CMD ["npm", "run", "dev"]
