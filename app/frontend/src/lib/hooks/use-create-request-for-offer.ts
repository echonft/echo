import { ApiRoutes, getApiRouteUrl } from '@echo/api/dist/public'
import { CreateRequestForOfferRequest, CreateRequestForOfferResponse, ItemRequest } from '@echo/api/dist/types'
import { Contract } from '@echo/model'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty, putData } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, or, path, pipe } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  url: string
  request: CreateRequestForOfferRequest | undefined
}
export const useCreateRequestForOffer = (
  discordId: string,
  items: ItemRequest[] | undefined,
  target: Contract[] | undefined
) =>
  useSWR<R.Result<CreateRequestForOfferResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_CREATE_FOR_OFFER,
        data: {
          url: getApiRouteUrl(ApiRoutes.REQUEST_FOR_OFFER),
          request: {
            discordGuildId: discordId,
            items: items!,
            target: target!
          }
        }
      },
      always(or(isNilOrEmpty(items), isNilOrEmpty(target)))
    ),
    converge(
      (url: string, data: CreateRequestForOfferRequest) =>
        putData<CreateRequestForOfferResponse, CreateRequestForOfferRequest>(url, data),
      [
        pipe(path(['data', 'url']), castAs<string>),
        pipe(path(['data', 'request']), castAs<CreateRequestForOfferRequest>)
      ]
    )
  )
