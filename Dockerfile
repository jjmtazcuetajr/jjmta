# node version
FROM node:23.3.0-alpine

# set working directory
WORKDIR /app

# copy package files so that Docker can cache the node_modules layer
COPY package*.json ./

# use a cache mount for npm, then install dependencies from lockfile
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# copy project files from the source (local machine) to the destination (inside the docker container)
COPY . .

# expose port 4321 (Astro's default port)
EXPOSE 4321

# start development server
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]