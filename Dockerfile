# Stage 1: Build the Angular application
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration production

# Stage 2: Serve the Angular app using NGINX
FROM nginx:alpine

# Copy your Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app from the build stage to the NGINX public directory
COPY --from=build-stage /app/dist/recommendation-system-book-frontend/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
