import {
  ApiRoutes,
  CreateRequestForOfferRequest,
  getApiRouteUrl,
  RequestForOfferResponse,
  TargetRequest
} from '@echo/api-public'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty, putData } from '@echo/utils'
import { always, converge, or, path } from 'ramda'
import useSWR, { SWRResponse } from 'swr'

interface KeyData {
  url: string
  request: CreateRequestForOfferRequest | undefined
}

export const useCreateRequestForOffer = (
  discordId: string,
  items: string[] | undefined,
  target: TargetRequest[] | undefined
): SWRResponse<RequestForOfferResponse, Error> =>
  useSWR<RequestForOfferResponse, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_CREATE_FOR_OFFER,
        data: {
          url: getApiRouteUrl(ApiRoutes.CREATE_REQUEST_FOR_OFFER),
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (url: string, data: CreateRequestForOfferRequest) =>
        putData<RequestForOfferResponse, CreateRequestForOfferRequest>(url, data),
      [path(['data', 'url']), path(['data', 'request'])]
    )
  )
