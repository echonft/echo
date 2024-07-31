import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import type { Nft, PartialOwnedNft } from '@echo/model/types/nft'
import { FieldValue } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export enum EscrowNftError {
  NFT_NOT_FOUND = 'NFT does not exist',
  NFT_ALREADY_IN_ESCROW = 'NFT is already in escrow'
}

export async function escrowNft(nft: PartialOwnedNft): Promise<string> {
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(EscrowNftError.NFT_NOT_FOUND))
  }
  const escrowedNftSnapshot = await getEscrowedNftSnapshot(snapshot.id)
  if (!isNil(escrowedNftSnapshot)) {
    return Promise.reject(Error(EscrowNftError.NFT_ALREADY_IN_ESCROW))
  }
  // remove NFT owner
  await updateReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    id: snapshot.id,
    data: { owner: FieldValue.delete() }
  })
  // add escrowed NFT
  return setReference<EscrowedNft>({
    collectionReference: getEscrowedNftsCollectionReference(),
    data: {
      nftId: snapshot.id,
      owner: nft.owner
    }
  })
}
