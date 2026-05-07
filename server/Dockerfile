# 1. Use an official base image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your application code
COPY . .

# 5. Expose the port your app runs on
EXPOSE 3000

# 6. Define the command to run your app
CMD ["npm", "start"]