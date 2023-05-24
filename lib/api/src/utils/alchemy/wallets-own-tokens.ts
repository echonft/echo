import { Nft, Wallet } from '@echo/model'
import { Alchemy } from 'alchemy-sdk'
import { intersection, isEmpty } from 'ramda'

// FIXME
export function walletsOwnTokens(client: Alchemy, wallets: Wallet[], items: Nft[]): Promise<boolean> {
  if (isEmpty(wallets) || isEmpty(items)) {
    return Promise.resolve(false)
  }
  const walletAddresses = wallets.map((wallet) => wallet.address)
  // Fetch all the owners of all the NFTs. Then check if the owners intersect with the wallets, if one doesn't, return false
  return Promise.all(
    items.map((item) => client.nft.getOwnersForNft(item.collection.contract.address, item.tokenId))
  ).then((responses) => !responses.some(({ owners }) => isEmpty(intersection(owners, walletAddresses))))
}
