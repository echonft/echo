import { maxRetries, waitTime } from '@echo/opensea/constants/fetch-params'
import { fetchInit } from '@echo/opensea/helpers/fetch-init'
import { error, warn } from '@echo/opensea/helpers/logger'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { chain, inc, modify, pick, pipe } from 'ramda'

interface TryFetchArgs {
  url: string
  init: RequestInit
  retries: number
}

async function tryFetch(args: TryFetchArgs): Promise<Response> {
  const { url, init, retries } = args
  if (retries === maxRetries) {
    error({ chain, retries }, 'throttling max retries reached. Returning error :(')
    return Promise.resolve(Response.error())
  }
  if (retries > 0) {
    warn({ retries }, 'retrying request')
  }
  const response = await fetch(url, init)
  if (!response.ok) {
    if (response.status === 429) {
      warn({ retries }, `request throttled by Opensea. Retrying in ${waitTime / 1000} seconds....`)
      // Opensea throttled the request, wait 1 minute and retry
      return await pipe<[TryFetchArgs], TryFetchArgs, Promise<Response>, Promise<Response>>(
        modify('retries', inc),
        tryFetch,
        delayPromise(waitTime)
      )(args)
    } else {
      error({ retries, response: pick(['status'], response) }, 'error fetching request')
      return response
    }
  }
  return response
}

export async function throttleFetch(url: string) {
  const init = await fetchInit()
  return await tryFetch({ url, retries: 0, init })
}
