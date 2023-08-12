import { CollectionName } from '../../config/collection-name'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreNftCollectionData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertNftCollection))(CollectionName.NFT_COLLECTIONS, documentPath)
