import type { GetOfferByIdContractRequest } from '@echo/api/types/requests/get-offer-by-id-contract-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { apiPathProvider } from '@echo/routing/api-path-provider'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import axios, { AxiosError } from 'axios'
import { assoc, inc, modify, pipe } from 'ramda'

interface FetchOfferArgs extends GetOfferByIdContractRequest {
  retries: number
}

async function fetchOffer(args: FetchOfferArgs): Promise<OfferResponse> {
  try {
    const response = await axios.get<OfferResponse>(apiPathProvider.offer.getByIdContract.getUrl(args), {
      withCredentials: true
    })
    return response.data
  } catch (err) {
    const axiosError = err as AxiosError<OfferResponse>
    // we only retry on not found errors
    if (args.retries === 10 || axiosError.response?.status !== 404) {
      return Promise.reject(axiosError)
    }
    return await delayPromise(
      pipe<[FetchOfferArgs], FetchOfferArgs, Promise<OfferResponse>>(modify('retries', inc), fetchOffer),
      2000
    )(args)
  }
}

export function getOfferByIdContract(args: GetOfferByIdContractRequest) {
  return pipe(assoc('retries', 0), fetchOffer)(args)
}
