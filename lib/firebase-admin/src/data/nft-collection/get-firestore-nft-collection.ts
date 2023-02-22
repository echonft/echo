import { convertNftCollection } from '../../converters/nft-collection'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreNftCollection = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertNftCollection))('nft-collections', documentPath)
