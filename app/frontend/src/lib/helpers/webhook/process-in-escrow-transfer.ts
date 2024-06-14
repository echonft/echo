import { addEscrowedNftWithId } from '@echo/firestore/crud/escrowed-nft/add-escrowed-nft-with-id'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getCollectionSwitch } from '@echo/frontend/lib/helpers/webhook/get-collection-switch'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { isNil } from 'ramda'

export async function processInEscrowTransfer(args: NftTransfer): Promise<void> {
  const { contractAddress, chain, tokenId } = args
  const collection = await getCollectionSwitch({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  const nftSnapshot = await getNftSnapshot(nftIndex)
  // Should not happen
  if (isNil(nftSnapshot)) {
    return
  }
  const nftData = nftSnapshot.data()
  const nft: NftWithId = { ...nftData, id: nftSnapshot.id }
  // We add the escrowed NFT with NFT data and remove it from the NFT database
  await addEscrowedNftWithId(nft)
  await deleteNft(nftSnapshot.id)
}
