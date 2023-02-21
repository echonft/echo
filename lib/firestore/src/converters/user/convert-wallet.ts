import { FirestoreWallet, FirestoreWalletData } from '../../types'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreConverter } from '../../types/converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertWallet: FirestoreConverter<FirestoreWallet, FirestoreWalletData> = pipe<
  [FirestoreSnapshot<FirestoreWallet>],
  FirestoreWalletData,
  Promise<FirestoreWalletData>
>(convertSnapshot, toPromise)
