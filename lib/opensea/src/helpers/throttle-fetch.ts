import { fetchInit } from '@echo/opensea/constants/fetch-init'
import { MAX_RETRIES, WAIT_TIME } from '@echo/opensea/constants/fetch-params'
import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { always, assoc, converge, identity, inc, pipe, prop } from 'ramda'

interface ThrottleFetchArgs extends WithFetchRequest {
  url: string
}

async function tryFetch(args: ThrottleFetchArgs & { retries: number }): Promise<Response> {
  const { fetch, url, retries } = args
  if (retries === MAX_RETRIES) {
    pinoLogger.error(`request to ${url} throttling max retries reached. Returning error :(`)
    return Promise.resolve(Response.error())
  }
  if (retries > 0) {
    pinoLogger.warn(`retrying request to ${url}`)
  } else {
    pinoLogger.info(`fetching request to ${url}`)
  }
  const response = await fetch(url, fetchInit)
  if (!response.ok && response.status === 429) {
    pinoLogger.error(`request to ${url} got throttled by Opensea. Retrying in ${WAIT_TIME / 1000} seconds....`)
    // Opensea throttled the request, wait 1 minute and retry
    return await delayPromise(
      pipe(converge(assoc, [always('retries'), pipe(prop('retries'), inc), identity]), tryFetch),
      WAIT_TIME
    )(args)
  }
  if (retries > 0) {
    pinoLogger.info(`throttle success for request to ${url}`)
  }
  return response
}

export async function throttleFetch(args: ThrottleFetchArgs) {
  return await tryFetch(assoc('retries', 0, args))
}
