import { FirestoreWallet, FirestoreWalletData } from '../../types'
import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertWallet: FirestoreNestedDocumentConverter<FirestoreWallet, FirestoreWalletData> = pipe<
  [FirestoreWallet],
  FirestoreWalletData,
  Promise<FirestoreWalletData>
>(castAs, toPromise)
