import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { GetOfferByIdContractParams } from '@echo/api/types/params/get-offer-by-id-contract-params'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import axios, { AxiosError } from 'axios'
import { assoc, inc, modify, pipe } from 'ramda'

interface FetchOfferArgs extends GetOfferByIdContractParams {
  retries: number
}

async function fetchOffer(args: FetchOfferArgs): Promise<OfferResponse> {
  try {
    const response = await axios.get<OfferResponse>(apiUrlProvider.offer.getByIdContract.getUrl(args), {
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
export function getOfferByIdContract(args: GetOfferByIdContractParams) {
  return pipe(assoc('retries', 0), fetchOffer)(args)
}
