import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Nft } from '@echo/model/types/nft/nft'

export async function addNft(nft: NftDocumentData): Promise<NewDocument<Nft>> {
  const id = await setReference({
    collectionReference: getNftsCollectionReference(),
    data: nft
  })
  return { id, data: nftDataConverter.fromDocumentData(nft) }
}
