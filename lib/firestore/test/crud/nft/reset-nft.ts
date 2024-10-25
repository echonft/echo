import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { type NftIndex } from '@echo/model/types/nft'
import { nftDocumentMocks } from '@echo/test/firestore/initialize-db'
import { find, isNil } from 'ramda'

export async function resetNft(nft: NftIndex): Promise<void> {
  const snapshot = await getNftSnapshot(nft)
  if (!isNil(snapshot)) {
    await updateReference({
      collectionReference: nftsCollection(),
      id: snapshot.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data: find<NftDocument>(eqNft(nft), nftDocumentMocks)!
    })
  }
}
