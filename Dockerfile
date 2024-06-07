# syntax = docker/dockerfile:1

FROM node:20.11.0-slim as base
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

FROM dependencies AS buildContractListener
RUN pnpm exec turbo build --filter=@echo/contract-listener
RUN pnpm prune --prod --silent

FROM dependencies AS buildBot
RUN pnpm exec turbo sentry:sourcemaps:upload --filter=@echo/bot
RUN pnpm prune --prod --silent

FROM base AS contractListener
COPY --from=buildContractListener /app/node_modules ./node_modules
COPY --from=buildContractListener /app/app/contract-listener/node_modules ./app/contract-listener/node_modules
COPY --from=buildContractListener /app/app/contract-listener/package.json ./app/contract-listener/package.json
COPY --from=buildContractListener /app/app/contract-listener/dist ./app/contract-listener/dist
WORKDIR /app/app/contract-listener/
CMD [ "pnpm", "start" ]

FROM base AS bot
COPY --from=buildBot /app/node_modules ./node_modules
COPY --from=buildBot /app/app/bot/node_modules ./app/bot/node_modules
COPY --from=buildBot /app/app/bot/package.json ./app/bot/package.json
COPY --from=buildBot /app/app/bot/dist ./app/bot/dist
WORKDIR /app/app/bot/
CMD [ "pnpm", "start" ]
