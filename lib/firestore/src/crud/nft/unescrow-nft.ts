import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftReferenceById } from '@echo/firestore/crud/nft/get-nft-reference-by-id'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { escrowedNftsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'
import { getReferenceDocumentSnapshot } from '@echo/firestore/helpers/reference/get-reference-document-snapshot'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { NftError } from '@echo/model/constants/errors/nft-error'
import type { Address } from '@echo/model/types/address'
import { isNil, pipe, toLower } from 'ramda'

export async function unescrowNft(nftId: string, newOwnerAddress: Address): Promise<NftDocument> {
  const snapshot = await pipe(getNftReferenceById, getReferenceDocumentSnapshot)(nftId)
  if (!snapshot.exists) {
    return Promise.reject(Error(NftError.NotFound))
  }

  const nft = snapshot.data()
  if (isNil(nft)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  const escrowedNftSnapshot = await getEscrowedNftSnapshot(snapshot.id)
  if (isNil(escrowedNftSnapshot)) {
    return Promise.reject(Error(NftError.NotInEscrow))
  }
  const escrowedNft = escrowedNftSnapshot.data()
  if (isNil(escrowedNft)) {
    return Promise.reject(Error(NftError.NotInEscrow))
  }
  // delete escrowed NFT
  await deleteReference({
    collectionReference: escrowedNftsCollection(),
    id: escrowedNftSnapshot.id
  })

  // Check if the new owner exists in our database
  const newOwner = await getUserByWallet(toLower(newOwnerAddress))
  if (isNil(newOwner)) {
    // If the new owner doesn't exist, remove the NFT owner
    return await removeNftOwner(nft)
  }
  // Set the new owner
  return await setNftOwner({ nft, owner: newOwner })
}
