# syntax = docker/dockerfile:1

FROM node:20.11.0-slim AS base
LABEL fly_launch_runtime="NodeJS"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS dependencies
RUN apt-get update -qq
RUN apt-get install -qq -y build-essential pkg-config python-is-python3
COPY --link . ./
RUN pnpm install --frozen-lockfile --silent


FROM dependencies AS build
RUN pnpm exec turbo sentry:sourcemaps:upload --filter=@echo/bot
RUN pnpm prune --prod --silent


FROM base
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/app/bot/node_modules ./app/bot/node_modules
COPY --from=build /app/app/bot/package.json ./app/bot/package.json
COPY --from=build /app/app/bot/dist ./app/bot/dist
WORKDIR /app/app/bot/
CMD [ "pnpm", "start" ]
