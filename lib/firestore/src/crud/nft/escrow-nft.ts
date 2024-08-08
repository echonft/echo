import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import type { OwnedNftIndex } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export enum EscrowNftError {
  NFT_ALREADY_IN_ESCROW = 'NFT is already in escrow'
}

export async function escrowNft(nft: OwnedNftIndex): Promise<string> {
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NOT_FOUND))
  }
  const escrowedNftSnapshot = await getEscrowedNftSnapshot(snapshot.id)
  if (!isNil(escrowedNftSnapshot)) {
    return Promise.reject(Error(EscrowNftError.NFT_ALREADY_IN_ESCROW))
  }
  // remove NFT owner
  await removeNftOwner(nft)
  // add escrowed NFT
  return setReference<EscrowedNft>({
    collectionReference: getEscrowedNftsCollectionReference(),
    data: {
      nftId: snapshot.id,
      owner: nft.owner
    }
  })
}
