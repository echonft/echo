import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import type { NextFetchRequestConfig } from '@echo/frontend/lib/types/services/fetch/next-fetch-request-config'
import type { NextFetchResponse } from '@echo/frontend/lib/types/services/fetch/next-fetch-response'
import { isDev } from '@echo/utils/constants/is-dev'
import { toPromise } from '@echo/utils/fp/to-promise'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { stringify } from 'qs'
import { andThen, assoc, assocPath, concat, converge, isNil, modify, partialRight, pipe, prop, tryCatch } from 'ramda'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface HandleConfigArgs<Query, Body> {
  config: NextFetchRequestConfig<Query, Body> | undefined
  init: RequestInit &
    Partial<Record<'cache', 'no-store' | 'force-cache'>> &
    Partial<Record<'next', Partial<Record<'tags', string[]>>>>
  url: string
}

function assertConfig<Query, Body>(config: NextFetchRequestConfig<Query, Body> | undefined, method: HttpMethod) {
  if (isNil(config)) {
    return
  }
  if (method === 'GET' && !isNil(config.data)) {
    throw Error('GET requests cannot have a body')
  }
  if (!isNil(config.disableCache) && !isNil(config.revalidate)) {
    throw Error('requests cannot have both disableCache and revalidate - only one should be specified')
  }
}

function handleBearerToken<Query, Body>(args: HandleConfigArgs<Query, Body>): HandleConfigArgs<Query, Body> {
  if (isNil(args.config) || isNil(args.config.bearerToken)) {
    return args
  }
  const {
    config: { bearerToken }
  } = args
  return modify('init', assocPath(['headers', 'Authorization'], `Bearer ${bearerToken}`), args)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleData<Query, Body>(args: HandleConfigArgs<Query, Body>): HandleConfigArgs<Query, Body> {
  if (isNil(args.config) || isNil(args.config.data)) {
    return args
  }
  const {
    config: { data }
  } = args
  const body = JSON.stringify(data)
  return modify('init', assoc('body', body), args)
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
  const query = stringify(params, { addQueryPrefix: true, arrayFormat: 'brackets', skipNulls: true })
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

function handleUncaughtError<T>(error: unknown): NextFetchResponse<T> {
  return { data: undefined, error: { message: errorMessage(error), status: ErrorStatus.SERVER_ERROR } }
}

async function handleResponse<T>(response: Response): Promise<NextFetchResponse<T>> {
  if (response.ok) {
    try {
      const data = (await response.json()) as T
      return { data, error: undefined }
    } catch (e) {
      return handleUncaughtError(e)
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
    assertConfig(args.config, method)
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
        headers: {
          'Content-Type': 'application/json',
          method
        }
      }),
      handleBearerToken,
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
    return tryCatch(
      pipe<
        [Omit<HandleConfigArgs<Query, never>, 'init'>],
        HandleConfigArgs<Query, Body>,
        Promise<Response>,
        Promise<NextFetchResponse<TResponse>>
      >(handleConfig('GET'), converge(fetch, [prop('url'), prop('init')]), andThen(handleResponse<TResponse>)),
      pipe(handleUncaughtError<TResponse>, toPromise)
    )({ url, config })
  }
}
