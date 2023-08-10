import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreWalletData } from '../../types/model/data/user/firestore-wallet-data'
import { Wallet } from '@echo/model'
import { andThen, identity } from 'ramda'

export const mapWallet: FirestoreMapper<FirestoreWalletData, Wallet> = andThen(identity)
