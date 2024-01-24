import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryDocumentData } from '@echo/firestore/helpers/crud/query/get-query-document-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import type { HexString } from '@echo/utils/types/hex-string'
import { pipe, toLower } from 'ramda'

export function findNftByCollectionContract(
  collectionContractAddress: Lowercase<HexString>,
  collectionContractChainId: number,
  tokenId: number
): Promise<Nft | undefined> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('tokenId', '==', tokenId),
    queryWhere<Nft>('collection.contract.address', '==', toLower(collectionContractAddress)),
    queryWhere<Nft>('collection.contract.chainId', '==', collectionContractChainId),
    getQueryDocumentData
  )()
}
