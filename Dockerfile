# ---------- Build stage ----------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build

# ---------- Production stage ----------
FROM nginx:alpine

# Remove default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# Use a custom nginx config with port 8081
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose your custom port
EXPOSE 8081

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
