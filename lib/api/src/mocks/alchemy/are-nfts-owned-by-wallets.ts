import { Wallet } from '@echo/model'

interface Arguments {
  nfts: never[]
  wallets: Wallet[]
}

export const mockAreNftsOwnedByWallets = (arg: Arguments) => {
  if (arg.wallets.some((wallet) => wallet.address === 'reject')) {
    return Promise.reject('error')
  }
  if (arg.wallets.some((wallet) => wallet.address === 'error')) {
    return Promise.resolve(false)
  }
  return Promise.resolve(true)
}
