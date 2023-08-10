import { ApiRoutes, getApiRouteUrl, NonceResponse } from '@echo/api-public'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { getUrl, isNilOrEmpty } from '@echo/utils'
import { always, converge, path } from 'ramda'
import { SWRResponse } from 'swr'
import useSWRImmutable from 'swr/immutable'

interface KeyData {
  url: string
}

export const useFetchNonce = (userId: string | undefined): SWRResponse<NonceResponse, Error> =>
  useSWRImmutable<NonceResponse, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_FETCH_NONCE,
        data: {
          url: getApiRouteUrl(ApiRoutes.NONCE)
        }
      },
      always(isNilOrEmpty(userId))
    ),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    converge((url: string) => getUrl<NonceResponse>(url), [path(['data', 'url'])])
  )
