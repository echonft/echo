import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { type NftIndex } from '@echo/model/types/nft'
import { find, isNil } from 'ramda'

export async function resetNft(nft: NftIndex): Promise<void> {
  const snapshot = await getNftSnapshot(nft)
  if (!isNil(snapshot)) {
    await updateReference({
      collectionReference: getNftsCollectionReference(),
      id: snapshot.id,
      data: find(eqNft(nft), nftMocks)
    })
  }
}
