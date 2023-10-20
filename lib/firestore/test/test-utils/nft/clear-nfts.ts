import { deleteNft } from '@test-utils/nft/delete-nft'
import { getAllNfts } from '@test-utils/nft/get-all-nfts'

export async function clearNfts() {
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    try {
      await deleteNft(nft.id)
    } catch (e) {
      // nothing to do
    }
  }
}
