import { convertNftCollection } from '../../converters/nft-collection'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { FirestoreNftCollection } from '@echo/firestore'

export const getFirestoreNftCollection = (documentPath: string) =>
  getDocSnapshot<FirestoreNftCollection>('nft-collections', documentPath).then(convertNftCollection)
