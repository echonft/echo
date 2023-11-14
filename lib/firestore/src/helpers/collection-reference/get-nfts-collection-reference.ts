import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getNftsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.NFTS).withConverter(nftDataConverter)
}
