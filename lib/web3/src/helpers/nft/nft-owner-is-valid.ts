import type { Nft } from '@echo/model/types/nft'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { equals } from 'ramda'

export async function nftOwnerIsValid(nft: Nft, logger?: LoggerInterface): Promise<boolean> {
  const {
    owner: { wallet }
  } = nft
  const ownerWallet = await getNftOwner(nft)
  const validOWner = equals(wallet, ownerWallet)
  if (!validOWner) {
    logger?.warn(
      `${wallet.address} is not the owner of NFT ${nft.collection.slug} #${nft.tokenId} (owner is ${validOWner})`
    )
  }
  return validOWner
}
