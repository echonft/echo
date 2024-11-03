import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { escrowedNftsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Nft, OwnedNftIndex } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function escrowNft(nft: OwnedNftIndex): Promise<string> {
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  const escrowedNftSnapshot = await getEscrowedNftSnapshot(snapshot.id)
  if (!isNil(escrowedNftSnapshot)) {
    return Promise.reject(Error(NftError.AlreadyInEscrow))
  }
  if (!isOwnedNft(nft as Nft) || !isOwnedNft(snapshot.data())) {
    return Promise.reject(Error(NftError.NoOwner))
  }
  // remove NFT owner
  await removeNftOwner(nft)
  // add escrowed NFT
  return setReference({
    collectionReference: escrowedNftsCollection(),
    data: {
      nftId: snapshot.id,
      owner: nft.owner
    }
  })
}
