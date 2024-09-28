#
# 🧑‍💻 Development
#
FROM node:20.10-alpine as dev
# add the missing shared libraries from alpine base image
RUN apk add --no-cache libc6-compat
# Create app folder
WORKDIR /app

# Set to dev environment
ENV NODE_ENV dev

# Copy source code into app folder
COPY --chown=node:node . .

# Install dependencies
RUN npm ci

# Set Docker as a non-root user
USER node

#
# 🏡 Production Build
#
FROM node:20.10-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production

COPY --chown=node:node --from=dev /app/node_modules ./node_modules
# Copy source code
COPY --chown=node:node . .

# Generate the production build. The build script runs "nest build" to compile the application.
RUN npm run build

# Install only the production dependencies and clean cache to optimize image size.
RUN npm ci --only=production --no-cache && npm cache clean --force

# Set Docker as a non-root user
USER node

#
# 🚀 Production Server
#
FROM node:20.10-alpine as prod

WORKDIR /app
RUN apk add --no-cache --upgrade bash
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production

# Copy only the necessary files
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

USER node

CMD ["node", "dist/main.js"]