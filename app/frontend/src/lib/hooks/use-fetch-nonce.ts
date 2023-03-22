import { ApiRoutes, getApiRouteUrl, NonceRequest, NonceResponse } from '@echo/api'
import { getConditionalFetchKey, postData, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, isNil, path, pipe } from 'ramda'
import useSWRImmutable from 'swr/immutable'

interface KeyData {
  url: string
  request: NonceRequest | undefined
}
export const useFetchNonce = (address: string | undefined) =>
  useSWRImmutable<R.Result<NonceResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_FETCH_NONCE,
        data: {
          url: getApiRouteUrl(ApiRoutes.NONCE),
          request: isNil(address)
            ? undefined
            : {
                address: address
              }
        }
      },
      always(isNilOrEmpty(address))
    ),
    converge<
      Promise<R.Result<NonceResponse, Error>>,
      [(key: SwrKey<KeyData>) => string, (key: SwrKey<KeyData>) => NonceRequest]
    >(
      (url: string, data: NonceRequest) => postData<NonceResponse, NonceRequest>(url, data),
      [pipe(path(['data', 'url']), castAs<string>), pipe(path(['data', 'request']), castAs<NonceRequest>)]
    )
  )
