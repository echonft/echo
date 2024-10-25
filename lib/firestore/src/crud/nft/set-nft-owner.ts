import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { type NftIndex } from '@echo/model/types/nft'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { User } from '@echo/model/types/user'
import { isNil } from 'ramda'

interface SetNftOwnerArgs {
  nft: NftIndex
  owner: User
}

export async function setNftOwner(args: SetNftOwnerArgs): Promise<OwnedNft> {
  const { nft, owner } = args
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  return (await updateReference({
    collectionReference: getNftsCollectionReference(),
    id: snapshot.id,
    data: { owner }
  })) as OwnedNft
}
