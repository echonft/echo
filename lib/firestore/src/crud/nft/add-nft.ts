import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { type Nft } from '@echo/model/types/nft/nft'
import { isNil } from 'ramda'

export async function addNft(nft: Nft): Promise<NewDocument<Nft>> {
  const existingNft = await getNftByIndex(nft)
  if (!isNil(existingNft)) {
    return Promise.reject(Error(NftError.Exists))
  }
  const id = await setReference({
    collectionReference: getNftsCollectionReference(),
    data: nft
  })
  return { id, data: nftDataConverter.fromDocumentData(nft) }
}
