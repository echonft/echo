import { convertNft } from '../../converters/nft/convert-nft'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName } from '@echo/firestore'
import { andThen, pipe } from 'ramda'

export const getFirestoreNftData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertNft))(CollectionName.NFTS, documentPath)
