# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.15.0
FROM node:${NODE_VERSION}-slim as base
ARG PNPM_VERSION=8.5.0
RUN npm --global install pnpm@${PNPM_VERSION}
LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=development

FROM base AS build

# Install node modules
COPY --link package.json .
COPY --link ./pnpm-lock.yaml .
COPY --link ./pnpm-workspace.yaml .
RUN pnpm install

# Copy application code
COPY --link . .

# Build application
RUN pnpm bot:build

# Remove development dependencies
#RUN npm prune --production

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
CMD [ "pnpm", "exec", "bot:start" ]
