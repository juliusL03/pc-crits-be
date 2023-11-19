FROM node:18-bookworm

# Working directory
WORKDIR /usr/src/app

# Copy files
COPY . .

# Start the container
CMD ["yarn", "start:dev"]