import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { type Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function addNft(nft: Nft): Promise<NewDocument<NftDocument>> {
  const existingNft = await getNftByIndex(nft)
  if (!isNil(existingNft)) {
    return Promise.reject(Error(NftError.Exists))
  }
  const id = await setReference({
    collectionReference: nftsCollection(),
    data: nft
  })
  return { id, data: nft }
}
