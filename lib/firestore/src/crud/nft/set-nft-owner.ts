import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { type NftIndex } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { isNil } from 'ramda'

interface SetNftOwnerArgs {
  nft: NftIndex
  owner: User
}

export async function setNftOwner(args: SetNftOwnerArgs): Promise<NftDocument> {
  const { nft, owner } = args
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
