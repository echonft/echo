import { FirestoreWalletData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { Wallet } from '@echo/model'
import { castAs } from '@echo/utils'
import { andThen } from 'ramda'

export const mapWallet: FirestoreMapper<FirestoreWalletData, Wallet> = andThen(castAs<FirestoreWalletData, Wallet>)
