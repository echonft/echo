import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { convertWallet } from './convert-wallet'
import { FirestoreUser, FirestoreUserData, FirestoreWallet, FirestoreWalletData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertUser: FirestoreConverter<FirestoreUser, FirestoreUserData> = pipe(
  convertSnapshot,
  juxt([
    propToPromise<string>('id'),
    propToPromise<string>('discordId'),
    propToPromise<string>('nonce'),
    nestedDocumentArrayProp<FirestoreWallet, FirestoreWalletData>('wallets', convertWallet)
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreUserData>(['id', 'discordId', 'nonce', 'wallets'])
)
