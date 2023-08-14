import { CollectionName } from '../../config/collection-name'
import { convertSwap } from '../../converters/swap/convert-swap'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreSwapData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertSwap))(CollectionName.SWAPS, documentPath)
