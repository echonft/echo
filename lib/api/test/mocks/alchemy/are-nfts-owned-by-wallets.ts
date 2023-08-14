import { Wallet } from '@echo/ui'

export interface MockAreNftsOwnedByWalletsArgs {
  nfts: never[]
  wallets: Wallet[]
}

export const mockAreNftsOwnedByWallets = (arg: MockAreNftsOwnedByWalletsArgs) => {
  if (arg.wallets.some((wallet) => wallet.address === 'reject')) {
    return Promise.reject('error')
  }
  if (arg.wallets.some((wallet) => wallet.address === 'error')) {
    return Promise.resolve(false)
  }
  return Promise.resolve(true)
}
