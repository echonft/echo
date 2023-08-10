import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreWallet, FirestoreWalletData } from '@echo/firestore'
import { toPromise } from '@echo/utils'

export const convertWallet: FirestoreNestedDocumentConverter<FirestoreWallet, FirestoreWalletData> = toPromise
