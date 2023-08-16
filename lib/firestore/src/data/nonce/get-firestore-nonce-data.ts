import { CollectionName } from '../../constants/collection-name'
import { convertNonce } from '../../converters/nonce/convert-nonce'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreNonceData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertNonce))(CollectionName.NONCES, documentPath)
