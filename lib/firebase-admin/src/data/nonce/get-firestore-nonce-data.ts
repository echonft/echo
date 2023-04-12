import { convertNonce } from '../../converters/nonce/convert-nonce'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreNonceData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertNonce))('nonces', documentPath)
