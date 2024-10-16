import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { mapToPartialWithFieldValue } from '@echo/firestore/mappers/map-to-partial-with-field-value'
import { type Nft, type NftIndex } from '@echo/model/types/nft/nft'
import { isNil } from 'ramda'

export async function updateNft(nft: NftIndex, data: Partial<Nft>): Promise<void> {
  const snapshot = await getNftSnapshot(nft)
  if (!isNil(snapshot)) {
    await updateReference({
      collectionReference: getNftsCollectionReference(),
      id: snapshot.id,
      data: mapToPartialWithFieldValue(data)
    })
  }
}
