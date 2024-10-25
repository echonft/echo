import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { fetchContract } from '@echo/opensea/fetchers/fetch-contract'
import { getCollection } from '@echo/opensea/services/get-collection'
import type { FetchCollectionRequest } from '@echo/opensea/types/request/fetch-collection-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, applySpec, pipe, prop } from 'ramda'

export async function getCollectionByAddress(contract: Contract): Promise<Nullable<Collection>> {
  return await pipe(
    fetchContract,
    andThen(
      pipe<[ContractResponse], FetchCollectionRequest, Promise<Nullable<Collection>>>(
        applySpec<FetchCollectionRequest>({ slug: prop('collection'), chain: prop('chain') }),
        getCollection
      )
    )
  )(contract)
}
