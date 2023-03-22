import { ApiRoutes, CreateOfferRequest, CreateOfferResponse, getApiRouteUrl } from '@echo/api'
import { getConditionalFetchKey, postData, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, isNil, path, pipe } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  url: string
  request: CreateOfferRequest | undefined
}

export const useCreateOffer = (request: CreateOfferRequest | undefined) =>
  useSWR<R.Result<CreateOfferResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.API_CREATE_OFFER, data: { url: getApiRouteUrl(ApiRoutes.OFFER), request } },
      always(isNil(request))
    ),
    converge<
      Promise<R.Result<CreateOfferResponse, Error>>,
      [(key: SwrKey<KeyData>) => string, (key: SwrKey<KeyData>) => CreateOfferRequest]
    >(
      (url: string, data: CreateOfferRequest) => postData<CreateOfferResponse, CreateOfferRequest>(url, data),
      [pipe(path(['data', 'url']), castAs<string>), pipe(path(['data', 'request']), castAs<CreateOfferRequest>)]
    )
  )
