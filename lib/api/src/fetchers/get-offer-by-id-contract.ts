import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Offer } from '@echo/model/types/offer'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import axios, { AxiosError } from 'axios'
import { assoc, inc, modify, pipe } from 'ramda'

interface FetchOfferArgs extends Pick<Offer, 'idContract'> {
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
export function getOfferByIdContract(args: Pick<Offer, 'idContract'>) {
  return pipe(assoc('retries', 0), fetchOffer)(args)
}
