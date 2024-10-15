# Use the official Node.js image as the base image
FROM node:20.11.1 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application using nginx
FROM nginx:alpine

# Copy the built files from the previous stage
# Make sure the path matches the actual output path in your angular.json
COPY --from=build /app/dist/Recommendation-System-Book-Frontend /usr/share/nginx/html

# Expose port 80 (the default port for nginx)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
