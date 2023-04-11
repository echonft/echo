import { ApiRoutes } from '@echo/api/dist/routes/constants/api-routes'
import { NonceResponse } from '@echo/api/dist/types/models/responses/nonce-response'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, getUrl, isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, path, pipe } from 'ramda'
import useSWRImmutable from 'swr/immutable'

interface KeyData {
  url: string
}
// TODO Should not be immutable
// Should we use
export const useFetchNonce = (userId: string | undefined) =>
  useSWRImmutable<R.Result<NonceResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_FETCH_NONCE,
        data: {
          // FIXME The `getApiUrl` function from `@echo/api` leads to an error
          url: `http://localhost:3000/${ApiRoutes.NONCE}`
        }
      },
      always(isNilOrEmpty(userId))
    ),
    converge((url: string) => getUrl<NonceResponse>(url), [pipe(path(['data', 'url']), castAs<string>)])
  )
