import { wlContracts } from '@echo/backend/constants/wl-contracts'
import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionsByWallet } from '@echo/nft-scan/services/get-collections-by-wallet'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import { Environment, environment } from '@echo/utils/constants/environment'
import { isIn } from '@echo/utils/helpers/is-in'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, filter, isNil, isNotEmpty, map, otherwise, pipe, prop, reject } from 'ramda'

export async function isUserWhitelisted(address: Address): Promise<boolean> {
  if (environment() === Environment.Development) {
    return true
  }
  const collections = await pipe(
    getCollectionsByWallet,
    andThen(
      pipe<[FetchCollectionResponse[]], Nullable<Collection>[], Collection[]>(
        map<FetchCollectionResponse, Nullable<Collection>>(prop('collection')),
        reject(isNil)
      )
    ),
    otherwise(always([] as Collection[]))
  )(address)

  return pipe<[Collection[]], Address[], Address[], boolean>(
    map(prop('contract')),
    filter(isIn(wlContracts)),
    isNotEmpty
  )(collections)
}
