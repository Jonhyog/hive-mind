FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY . .
RUN npm install


# Exports
EXPOSE 3000
CMD [ "npm", "run", "start.dev" ]