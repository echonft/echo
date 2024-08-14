import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getNftDocumentDataMock } from '@echo/firestore/mocks/nft/get-nft-document-data-mock'
import { nftMock } from '@echo/model/mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { mapObjIndexed, pipe, values } from 'ramda'

export function initializeNfts() {
  return pipe(
    nftMock,
    mapObjIndexed((mock: Nft, id: string) =>
      getNftsCollectionReference(false).doc(id).set(getNftDocumentDataMock(mock))
    ),
    values,
    promiseAll
  )()
}
