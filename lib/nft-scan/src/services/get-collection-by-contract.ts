import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import type { Nullable } from '@echo/utils/types/nullable'

export function getCollectionByContract(contract: Address): Promise<Nullable<Collection>> {
  return fetchCollection({ contract })
}
