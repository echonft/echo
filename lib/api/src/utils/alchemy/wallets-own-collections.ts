import { Contract, Wallet } from '@echo/model'
import { isNilOrEmpty } from '@echo/utils'
import { Alchemy } from 'alchemy-sdk'
import { isEmpty } from 'ramda'

// TODO Add chain ID here
export function walletsOwnCollections(client: Alchemy, wallets: Wallet[], contracts: Contract[]): Promise<boolean> {
  if (isEmpty(wallets) || isEmpty(contracts)) {
    return Promise.resolve(false)
  }
  return Promise.all(
    wallets.map((wallet) =>
      client.nft.verifyNftOwnership(
        wallet.address,
        contracts.map((contract) => contract.address)
      )
    )
  ).then((result) =>
    result.every((contracts) =>
      isNilOrEmpty(contracts) ? false : Object.values(contracts).every((ownsCollection) => ownsCollection)
    )
  )
}
