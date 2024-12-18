# Install Linux Apline (specific version) + Node.js (specific version)
FROM node:20-alpine3.20

# Install ts-node: 
RUN npm i -g nodemon
RUN npm i -g ts-node

# Create folder named "app" in Linux root directory for our app:
WORKDIR /app

# Copy only package.json: 
COPY package.json /app

# React environment variables: 
ENV REACT_APP_ENVIRONMENT=development
ENV REACT_APP_BASE_URL=http://localhost:4100/

# Install node_modules:
RUN npm i

# Copy our app (without node_modules) from the current development folder (.) into image app folder (/app): 
COPY . /app

# --------------------------------------

# Which terminal command will run our app inside the container when container start:
ENTRYPOINT npm start

# --------------------------------------
