import { FirestoreUserData } from '../../types/model/data/user/firestore-user-data'
import { FirestoreWalletData } from '../../types/model/data/user/firestore-wallet-data'
import { map, pipe, prop } from 'ramda'

// TODO Should support multi chain
export const getUserWalletAddresses = pipe<[FirestoreUserData], FirestoreWalletData[], string[]>(
  prop<FirestoreWalletData[]>('wallets'),
  map<FirestoreWalletData, string>(prop<string>('address'))
)
