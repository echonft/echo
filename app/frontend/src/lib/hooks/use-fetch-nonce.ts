import { ApiRoutes } from '@echo/api/dist/routes/constants/api-routes'
import { NonceRequest } from '@echo/api/dist/types/models/requests/nonce-request'
import { NonceResponse } from '@echo/api/dist/types/models/responses/nonce-response'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty, postData } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, isNil, path, pipe } from 'ramda'
import useSWRImmutable from 'swr/immutable'

interface KeyData {
  url: string
  request: NonceRequest | undefined
}
// TODO Should not be immutable
export const useFetchNonce = (userId: string | undefined) =>
  useSWRImmutable<R.Result<NonceResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_FETCH_NONCE,
        data: {
          url: `http://localhost:3000/${ApiRoutes.NONCE}`,
          request: isNil(userId)
            ? undefined
            : {
                userId
              }
        }
      },
      always(isNilOrEmpty(userId))
    ),
    converge(
      (url: string, data: NonceRequest) => postData<NonceResponse, NonceRequest>(url, data),
      [pipe(path(['data', 'url']), castAs<string>), pipe(path(['data', 'request']), castAs<NonceRequest>)]
    )
  )
