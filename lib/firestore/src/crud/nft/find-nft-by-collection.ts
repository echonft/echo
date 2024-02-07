import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe, toLower } from 'ramda'

export function findNftByCollection(args: Pick<Nft, 'collection' | 'tokenId'>): Promise<Nullable<Nft>> {
  const {
    collection: {
      contract: { address, chainId }
    },
    tokenId
  } = args
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('tokenId', '==', tokenId),
    queryWhere<Nft>('collection.contract.address', '==', toLower(address)),
    queryWhere<Nft>('collection.contract.chainId', '==', chainId),
    getQueryUniqueData
  )()
}
