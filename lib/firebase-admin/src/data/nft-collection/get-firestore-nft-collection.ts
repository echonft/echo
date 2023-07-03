import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName } from '@echo/firestore'
import { andThen, pipe } from 'ramda'

export const getFirestoreNftCollection = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertNftCollection))(CollectionName.NFT_COLLECTIONS, documentPath)
