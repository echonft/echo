import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'

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
