import { FirestoreWallet, FirestoreWalletData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { castAs } from '@echo/utils'
import { andThen } from 'ramda'

export const mapWallet: FirestoreMapper<FirestoreWalletData, FirestoreWallet> = andThen(
  castAs<FirestoreWalletData, FirestoreWallet>
)
