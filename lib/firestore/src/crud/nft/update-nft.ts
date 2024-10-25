import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import { mapToPartialWithFieldValue } from '@echo/firestore/mappers/map-to-partial-with-field-value'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { type NftIndex } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function updateNft(nft: NftIndex, data: Partial<NftDocument>): Promise<void> {
  const snapshot = await getNftSnapshot(nft)
  if (!isNil(snapshot)) {
    await updateReference({
      collectionReference: nftsCollection(),
      id: snapshot.id,
      data: mapToPartialWithFieldValue(data)
    })
  }
}
