import { maxRetries, waitTime } from '@echo/opensea/constants/fetch-params'
import { fetchInit } from '@echo/opensea/helpers/fetch-init'
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
  const logger = args.logger?.child({ retries })
  if (retries === maxRetries) {
    logger?.error('throttling max retries reached. Returning error :(')
    return Promise.resolve(Response.error())
  }
  if (retries > 0) {
    logger?.warn('retrying request')
  }
  const response = await fetch(url, init)
  if (!response.ok) {
    if (response.status === 429) {
      logger?.warn(`request throttled by Opensea. Retrying in ${waitTime / 1000} seconds....`)
      // Opensea throttled the request, wait 1 minute and retry
      return await pipe<[TryFetchArgs], TryFetchArgs, Promise<Response>, Promise<Response>>(
        modify('retries', inc),
        tryFetch,
        delayPromise(waitTime)
      )(args)
    } else {
      logger?.error({ response: pick(['status'], response) }, 'error fetching request')
      return response
    }
  }
  return response
}

export async function throttleFetch(args: ThrottleFetchArgs) {
  const init = await fetchInit(args.logger)
  return await tryFetch(pipe(assoc('retries', 0), assoc('init', init))(args))
}
