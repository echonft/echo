import { CollectionName } from '../../constants/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreNftData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertNft))(CollectionName.NFTS, documentPath)
