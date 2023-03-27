import { Contract, Wallet } from '@echo/model'
import { Alchemy } from 'alchemy-sdk'

// TODO Add chain ID here
export function walletsOwnCollection(client: Alchemy, wallets: Wallet[], contracts: Contract[]): Promise<boolean> {
  return Promise.all(
    wallets.map((wallet) =>
      client.nft.verifyNftOwnership(
        wallet.address,
        contracts.map((contract) => contract.address)
      )
    )
  ).then((isHoldingCollections) => isHoldingCollections.some((isHoldingCollection) => isHoldingCollection))
}
