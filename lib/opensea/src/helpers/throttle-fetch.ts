import { fetchInit } from '@echo/opensea/constants/fetch-init'
import { MAX_RETRIES, WAIT_TIME } from '@echo/opensea/constants/fetch-params'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { assoc, inc, modify, pick, pipe } from 'ramda'

interface ThrottleFetchArgs extends WithFetch, WithLogger {
  url: string
}

interface TryFetchArgs extends ThrottleFetchArgs {
  init: RequestInit
  retries: number
}

async function tryFetch(args: TryFetchArgs): Promise<Response> {
  const { fetch, url, init, retries } = args
  const logger = args.logger?.child({ fn: 'tryFetch', url, retries })
  if (retries === MAX_RETRIES) {
    logger?.error('throttling max retries reached. Returning error :(')
    return Promise.resolve(Response.error())
  }
  if (retries > 0) {
    logger?.warn('retrying request')
  }
  const response = await fetch(url, init)
  if (!response.ok) {
    if (response.status === 429) {
      logger?.warn(`request throttled by Opensea. Retrying in ${WAIT_TIME / 1000} seconds....`)
      // Opensea throttled the request, wait 1 minute and retry
      return await delayPromise(
        pipe<[TryFetchArgs], TryFetchArgs, Promise<Response>>(modify('retries', inc), tryFetch),
        WAIT_TIME
      )(args)
    } else {
      logger?.error({ response: pick(['status'], response) }, 'error fetching request')
      return response
    }
  }
  if (retries > 0) {
    logger?.info('throttle success')
  }
  return response
}

export async function throttleFetch(args: ThrottleFetchArgs) {
  args.logger?.info(`fetching request to ${args.url}`)
  const init = await fetchInit(args.logger)
  return await tryFetch(pipe(assoc('retries', 0), assoc('init', init))(args))
}
