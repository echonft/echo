import { NftIdWithContractAddress } from '../../types/helper/nft-id-with-contract-address'
import { Wallet } from '@echo/model'
import { Alchemy } from 'alchemy-sdk'
import { intersection, isEmpty } from 'ramda'

export function walletsOwnTokens(
  client: Alchemy,
  wallets: Wallet[],
  nfts: NftIdWithContractAddress[]
): Promise<boolean> {
  if (isEmpty(wallets) || isEmpty(nfts)) {
    return Promise.resolve(false)
  }
  const walletAddresses = wallets.map((wallet) => wallet.address)
  // Fetch all the owners of all the NFTs. Then check if the owners intersect with the wallets, if one doesn't, return false
  return Promise.all(nfts.map((nft) => client.nft.getOwnersForNft(nft.contractAddress, nft.tokenId))).then(
    (responses) => !responses.some(({ owners }) => isEmpty(intersection(owners, walletAddresses)))
  )
}
