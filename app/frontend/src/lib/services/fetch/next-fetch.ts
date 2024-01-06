import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import type { NextFetchRequestConfig } from '@echo/frontend/lib/types/services/fetch/next-fetch-request-config'
import type { NextFetchResponse } from '@echo/frontend/lib/types/services/fetch/next-fetch-response'
import { isDev } from '@echo/utils/constants/is-dev'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { stringify } from 'qs'
import { andThen, assoc, assocPath, concat, isNil, modify, partialRight, pipe } from 'ramda'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface HandleConfigArgs<Query, Body> {
  config: NextFetchRequestConfig<Query, Body> | undefined
  init: RequestInit &
    Partial<Record<'cache', 'no-store' | 'force-cache'>> &
    Partial<Record<'next', Partial<Record<'tags', string[]>>>>
  url: string
}

function handleCookies<Query, Body>(args: HandleConfigArgs<Query, Body>): HandleConfigArgs<Query, Body> {
  if (isNil(args.config) || isNil(args.config.cookie)) {
    return args
  }
  const {
    config: { cookie }
  } = args
  return modify('init', assocPath(['headers', 'cookie'], cookie), args)
}

function handleDisableCache<Query, Body>(args: HandleConfigArgs<Query, Body>): HandleConfigArgs<Query, Body> {
  if (!isDev && (isNil(args.config) || isNil(args.config.disableCache) || !args.config.disableCache)) {
    return args
  }
  return modify('init', assoc('cache', 'no-store' as const), args)
}

function handleParams<Query, Body>(args: HandleConfigArgs<Query, Body>): HandleConfigArgs<Query, Body> {
  if (isNil(args.config) || isNil(args.config.params)) {
    return args
  }
  const {
    config: { params }
  } = args
  const query = stringify(params, { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true })
  return modify('url', partialRight<string, string, string>(concat, [query]), args)
}

function handleRevalidate<Query, Body>(args: HandleConfigArgs<Query, Body>): HandleConfigArgs<Query, Body> {
  if (isNil(args.config) || isNil(args.config.revalidate)) {
    return args
  }
  const {
    config: { revalidate }
  } = args
  return modify('init', assocPath(['next', 'revalidate'], revalidate), args)
}

function handleTags<Query, Body>(args: HandleConfigArgs<Query, Body>): HandleConfigArgs<Query, Body> {
  if (isNil(args.config) || isNil(args.config.tags)) {
    return args
  }
  const {
    config: { tags }
  } = args
  return modify('init', assocPath(['next', 'tags'], tags), args)
}

async function tryFetch<Query, Body>(args: HandleConfigArgs<Query, Body>): Promise<Response> {
  try {
    return await fetch(args.url, args.init)
  } catch (e) {
    return Promise.resolve({
      ok: false,
      status: ErrorStatus.SERVER_ERROR,
      json: () => Promise.resolve({ error: errorMessage(e) })
    } as Response)
  }
}

async function handleResponse<T>(response: Response): Promise<NextFetchResponse<T>> {
  if (response.ok) {
    try {
      const data = (await response.json()) as T
      return { data, error: undefined }
    } catch (e) {
      return { data: undefined, error: { message: errorMessage(e), status: ErrorStatus.SERVER_ERROR } }
    }
  }
  try {
    const errorResponse = (await response.json()) as ErrorResponse
    return { data: undefined, error: { message: errorResponse.error, status: response.status } }
  } catch (e) {
    return { data: undefined, error: { message: errorMessage(e), status: response.status } }
  }
}

function handleConfig<Query, Body>(method: HttpMethod) {
  return function (args: Omit<HandleConfigArgs<Query, Body>, 'init'>): HandleConfigArgs<Query, Body> {
    return pipe<
      [Omit<HandleConfigArgs<Query, Body>, 'init'>],
      HandleConfigArgs<Query, Body>,
      HandleConfigArgs<Query, Body>,
      HandleConfigArgs<Query, Body>,
      HandleConfigArgs<Query, Body>,
      HandleConfigArgs<Query, Body>,
      HandleConfigArgs<Query, Body>
    >(
      assoc('init', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method
      }),
      handleCookies,
      handleDisableCache,
      handleParams,
      handleRevalidate,
      handleTags
    )(args)
  }
}
export const nextFetch = {
  get: <TResponse, Query = unknown>(
    url: string,
    config?: NextFetchRequestConfig<Query, never>
  ): Promise<NextFetchResponse<TResponse>> => {
    return pipe<
      [Omit<HandleConfigArgs<Query, never>, 'init'>],
      HandleConfigArgs<Query, never>,
      Promise<Response>,
      Promise<NextFetchResponse<TResponse>>
    >(
      handleConfig('GET'),
      tryFetch,
      andThen(handleResponse<TResponse>)
    )({ url, config })
  }
}
