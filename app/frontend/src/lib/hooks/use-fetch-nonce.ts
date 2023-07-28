import { ApiRoutes, getApiRouteUrl, NonceResponse } from '@echo/api-public'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, getUrl, isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, path, pipe } from 'ramda'
import useSWRImmutable from 'swr/immutable'

interface KeyData {
  url: string
}

export const useFetchNonce = (userId: string | undefined) =>
  useSWRImmutable<R.Result<NonceResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_FETCH_NONCE,
        data: {
          url: getApiRouteUrl(ApiRoutes.NONCE)
        }
      },
      always(isNilOrEmpty(userId))
    ),
    converge((url: string) => getUrl<NonceResponse>(url), [pipe(path(['data', 'url']), castAs<string>)])
  )
