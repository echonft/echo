import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function updateNft(data: Nft): Promise<void> {
  const snapshot = await getNftSnapshot(data)
  if (!isNil(snapshot)) {
    await updateReference<Nft>({
      collectionReference: getNftsCollectionReference(),
      id: snapshot.id,
      data
    })
  }
}
