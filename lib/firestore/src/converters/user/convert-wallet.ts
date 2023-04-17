import { FirestoreWallet, FirestoreWalletData } from '../../types'
import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { castAs, toPromise } from '@echo/utils'
import { always, either, identity, pipe } from 'ramda'

export const convertWallet: FirestoreNestedDocumentConverter<FirestoreWallet, FirestoreWalletData> = pipe<
  [FirestoreWallet],
  [FirestoreWallet],
  FirestoreWalletData,
  Promise<FirestoreWalletData>
>(either(identity, always([])), castAs, toPromise)
