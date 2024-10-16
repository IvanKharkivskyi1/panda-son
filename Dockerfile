# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port and start the app
EXPOSE 3001
CMD ["npm", "start"]
