# syntax = docker/dockerfile:1

FROM node:20.11.0-slim as base
LABEL fly_launch_runtime="NodeJS"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app/app/helper

FROM base AS build
RUN apt-get update -qq && \
	apt-get install -y build-essential pkg-config python-is-python3
COPY --link . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec turbo run build --filter=@echo/helper
RUN pnpm prune --prod

# Final stage for app image
FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/app/helper/node_modules /app/app/helper/node_modules
COPY --from=build /app/app/helper/package.json /app/app/helper/package.json
COPY --from=build /app/app/helper/dist /app/app/helper/dist
CMD [ "pnpm", "start" ]
