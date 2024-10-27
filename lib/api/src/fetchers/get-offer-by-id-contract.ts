import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { apiPathProvider } from '@echo/routing/path/api-path-provider'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import axios, { AxiosError } from 'axios'
import { assoc, inc, modify, omit, pipe } from 'ramda'

interface FetchOfferArgs {
  readonly idContract: HexString
  readonly retries: number
}

async function fetchOffer(args: FetchOfferArgs): Promise<OfferResponse> {
  try {
    const response = await axios.get<OfferResponse>(
      apiPathProvider.offer.getByIdContract.getUrl(omit(['retries'], args)),
      {
        withCredentials: true
      }
    )
    return response.data
  } catch (err) {
    const axiosError = err as AxiosError<OfferResponse>
    // we only retry on not found errors
    if (args.retries === 10 || axiosError.response?.status !== 404) {
      return Promise.reject(axiosError)
    }
    return await pipe<[FetchOfferArgs], FetchOfferArgs, Promise<OfferResponse>, Promise<OfferResponse>>(
      modify('retries', inc),
      fetchOffer,
      delayPromise(2000)
    )(args)
  }
}

export function getOfferByIdContract(args: Omit<FetchOfferArgs, 'retries'>) {
  return pipe(assoc('retries', 0), fetchOffer)(args)
}
