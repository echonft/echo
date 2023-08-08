import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreWallet } from '../../types/model/collections/user/firestore-wallet'
import { FirestoreWalletData } from '../../types/model/data/user/firestore-wallet-data'
import { toPromise } from '@echo/utils'
import { always, either, identity, pipe } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const convertWallet: FirestoreNestedDocumentConverter<FirestoreWallet, FirestoreWalletData> = pipe(
  either(identity, always([])),
  toPromise
)
