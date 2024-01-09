# syntax = docker/dockerfile:1
ARG NODE_VERSION=18.15.0
FROM node:${NODE_VERSION}-slim as base
ARG PNPM_VERSION=8.13.1
RUN npm --global install pnpm@${PNPM_VERSION}
LABEL fly_launch_runtime="Echo Helper"
ENV CI=true

# NodeJS app lives here
WORKDIR /app

# Set development environment for build and install
ENV NODE_ENV=development

FROM base AS build

# Copy application code
COPY --link ../../../../../.. .
RUN pnpm install

# Final stage for app image
FROM base
# Set production environment
ENV NODE_ENV=production

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
CMD [ "pnpm", "helper:start" ]
