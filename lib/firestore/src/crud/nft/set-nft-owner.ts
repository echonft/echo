import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import { type NftIndex, type OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { andThen, isNil, pipe } from 'ramda'

interface SetNftOwnerArgs {
  nft: NftIndex
  owner: User
}

export async function setNftOwner(args: SetNftOwnerArgs): Promise<OwnedNft> {
  const { nft, owner } = args
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NOT_FOUND))
  }
  return (await pipe(
    updateReference<NftDocumentData>,
    andThen(nftDataConverter.fromDocumentData)
  )({
    collectionReference: getNftsCollectionReference(false),
    id: snapshot.id,
    data: { owner }
  })) as OwnedNft
}
