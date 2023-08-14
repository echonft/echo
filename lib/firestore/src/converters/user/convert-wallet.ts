import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreWallet } from '../../types/model/collections/user/firestore-wallet'
import { FirestoreWalletData } from '../../types/model/data/user/firestore-wallet-data'
import { toPromise } from '@echo/utils'

export const convertWallet: FirestoreNestedDocumentConverter<FirestoreWallet, FirestoreWalletData> = toPromise
