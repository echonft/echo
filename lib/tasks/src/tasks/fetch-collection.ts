import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByContract } from '@echo/nft-scan/services/get-collection-by-contract'
import { error, info } from '@echo/tasks/helpers/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { otherwise, pipe } from 'ramda'

/**
 * Fetches a collection from the API
 * @param contract
 */
export function fetchCollection(contract: Address): Promise<Nullable<Collection>> {
  info({ collection: { contract } }, 'fetching collection')
  return pipe(
    getCollectionByContract,
    otherwise((err) => {
      error({ err, collection: { contract } }, 'could not fetch collection from API')
      return undefined
    })
  )(contract)
}
