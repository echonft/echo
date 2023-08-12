import { Wallet } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { FirestoreWalletData } from '@echo/firestore'
import { andThen, identity } from 'ramda'

export const mapWallet: FirestoreMapper<FirestoreWalletData, Wallet> = andThen(identity)
