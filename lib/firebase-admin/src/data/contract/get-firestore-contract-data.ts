import { convertContract } from '../../converters/contract'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { FirestoreContract } from '@echo/firestore'

export const getFirestoreContractData = (documentPath: string) =>
  getDocSnapshot<FirestoreContract>('contracts', documentPath).then(convertContract)
