import { User } from '../../types/model/user'
import { Wallet } from '../../types/model/wallet'
import { filter, map, pipe, prop, propEq } from 'ramda'

export const getUserWalletAddresses = (chainId: number) =>
  pipe<[User], Wallet[], Wallet[], string[]>(
    prop<Wallet[]>('wallets'),
    filter(propEq(chainId, 'chainId')),
    map<Wallet, string>(prop<string>('address'))
  )
