import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreWallet, FirestoreWalletData } from '@echo/firestore'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertWallet: FirestoreNestedDocumentConverter<FirestoreWallet, FirestoreWalletData> = pipe<
  [FirestoreWallet],
  FirestoreWalletData,
  Promise<FirestoreWalletData>
>(castAs, toPromise)
