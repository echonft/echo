import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreWallet } from '../../types/model/collections/user/firestore-wallet'
import { FirestoreWalletData } from '../../types/model/data/user/firestore-wallet-data'
import { castAs, toPromise } from '@echo/utils'
import { always, either, identity, pipe } from 'ramda'

export const convertWallet: FirestoreNestedDocumentConverter<FirestoreWallet, FirestoreWalletData> = pipe<
  [FirestoreWallet],
  [FirestoreWallet],
  FirestoreWalletData,
  Promise<FirestoreWalletData>
>(either(identity, always([])), castAs, toPromise)
