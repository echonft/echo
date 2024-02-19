import type { Nft } from '@echo/model/types/nft'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { equals } from 'ramda'

export async function nftOwnerIsValid(nft: Nft): Promise<boolean> {
  const {
    owner: { wallet }
  } = nft
  const ownerWallet = await getNftOwner(nft)
  return equals(wallet, ownerWallet)
}
