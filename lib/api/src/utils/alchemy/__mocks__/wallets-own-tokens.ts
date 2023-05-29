import { NftIdWithContractAddress } from '../../../types/model/helper/nftIdWithContractAddress'
import { nftFirestoreData } from '@echo/firestore'
import { Wallet } from '@echo/model'
import { Alchemy } from 'alchemy-sdk'
import { any, isEmpty } from 'ramda'

export function walletsOwnTokens(
  _client: Alchemy,
  wallets: Wallet[],
  nfts: NftIdWithContractAddress[]
): Promise<boolean> {
  if (isEmpty(wallets) || isEmpty(nfts)) {
    return Promise.resolve(false)
  }
  return Promise.resolve(
    any(
      (nft) => wallets.some((wallet) => wallet.address === nft.collection.contract.address),
      Object.values(nftFirestoreData)
    )
  )
}
