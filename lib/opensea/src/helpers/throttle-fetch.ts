import { MAX_RETRIES, WAIT_TIME } from '@echo/opensea/constants/fetch-params'
import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { always, assoc, converge, identity, inc, pipe, prop } from 'ramda'

interface ThrottleFetchArgs extends WithFetchRequest {
  input: RequestInfo | URL
  init?: RequestInit
}

async function tryFetch(args: ThrottleFetchArgs & { retries: number }): Promise<Response> {
  const { fetch, init, input, retries } = args
  if (retries === MAX_RETRIES) {
    return Promise.resolve(Response.error())
  }
  const response = await fetch(input, init)
  if (!response.ok && response.status === 429) {
    // Opensea throttled the request, wait 1 minute and retry
    return delayPromise(
      tryFetch,
      WAIT_TIME
    )(converge(assoc, [always('retries'), pipe(prop('retries'), inc), identity])(args))
  }
  return response
}

export function throttleFetch(args: ThrottleFetchArgs) {
  return tryFetch(assoc('retries', 0, args))
}
