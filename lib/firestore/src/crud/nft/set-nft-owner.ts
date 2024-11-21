import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { type NftIndex, type OwnedNft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

interface SetNftOwnerArgs {
  nft: NftIndex
  owner: OwnedNft['owner']
}

export async function setNftOwner({ nft, owner }: SetNftOwnerArgs): Promise<NftDocument> {
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  return await updateReference({
    collectionReference: nftsCollection(),
    id: snapshot.id,
    data: { owner }
  })
}
