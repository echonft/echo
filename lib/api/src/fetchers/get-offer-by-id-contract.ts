import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { GetOfferByIdContractParams } from '@echo/api/types/params/get-offer-by-id-contract-params'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import axios from 'axios'
import { prop } from 'ramda'

export function getOfferByIdContract(args: GetOfferByIdContractParams) {
  return axios
    .get<OfferResponse>(apiUrlProvider.offer.getByIdContract.getUrl(args), {
      withCredentials: true
    })
    .then(prop('data'))
}
