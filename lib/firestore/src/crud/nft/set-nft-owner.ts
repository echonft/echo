import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft, type NftIndex, type OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

interface SetNftOwnerArgs {
  index: NftIndex
  owner: User
}

export async function setNftOwner(args: SetNftOwnerArgs): Promise<OwnedNft> {
  const { index, owner } = args
  const snapshot = await getNftSnapshot(index)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NFT_NOT_FOUND))
  }
  return (await updateReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    id: snapshot.id,
    data: { owner, updatedAt: now() }
  })) as OwnedNft
}
