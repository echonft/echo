import { User } from '../../types/model/user'
import { Wallet } from '../../types/model/wallet'
import { map, pipe, prop } from 'ramda'

export const getUserWalletAddresses = pipe<[User], Wallet[], string[]>(
  prop<Wallet[]>('wallets'),
  map<Wallet, string>(prop<string>('address'))
)
