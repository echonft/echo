import { FirestoreUser, FirestoreUserData, FirestoreWallet, FirestoreWalletData } from '../../types'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { convertWallet } from './convert-wallet'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertUser: FirestoreConverter<FirestoreUser, FirestoreUserData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('discordId'),
    propToPromise('nonce'),
    nestedDocumentArrayProp<FirestoreWallet, FirestoreWalletData>('wallets', convertWallet)
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreUserData>(['refPath', 'id', 'discordId', 'nonce', 'wallets'])
)
