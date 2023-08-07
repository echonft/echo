import { Wallet } from '@echo/model'
import { R } from '@mobily/ts-belt'

interface Arguments {
  nfts: never[]
  wallets: Wallet[]
}

export const mockAreNftsOwnedByWallets = (arg: Arguments) => {
  if (arg.wallets.some((wallet) => wallet.address === 'reject')) {
    return Promise.reject('error')
  }
  if (arg.wallets.some((wallet) => wallet.address === 'error')) {
    return Promise.resolve(R.fromNullable(false, 'should not happen'))
  }
  return Promise.resolve(R.fromNullable(true, 'should not happen'))
}
