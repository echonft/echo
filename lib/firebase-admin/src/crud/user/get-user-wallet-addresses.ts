import { FirestoreUserData, FirestoreWalletData } from '@echo/firestore'
import { map, pipe, prop } from 'ramda'

// TODO Should support multi chain
export const getUserWalletAddresses = pipe<[FirestoreUserData], FirestoreWalletData[], string[]>(
  prop<FirestoreWalletData[]>('wallets'),
  map<FirestoreWalletData, string>(prop<string>('address'))
)
