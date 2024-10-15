import { NftError } from '@echo/firestore/constants/errors/nft-error'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/escrowed-nft-document-data'
import type { OwnedNftIndex } from '@echo/model/types/nft'
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
  // remove NFT owner
  await removeNftOwner(nft)
  // add escrowed NFT
  return setReference<EscrowedNftDocumentData, EscrowedNftDocumentData>({
    collectionReference: getEscrowedNftsCollectionReference(),
    data: {
      nftId: snapshot.id,
      owner: nft.owner
    }
  })
}
