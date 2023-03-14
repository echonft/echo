import { FirestoreSerializer } from '../../types/serializer/firestore-serializer'
import { FirestoreWallet } from '@echo/firestore'
import { Wallet } from '@echo/model'
import { castAs } from '@echo/utils'

export const serializeWallet: FirestoreSerializer<Wallet, FirestoreWallet> = castAs
