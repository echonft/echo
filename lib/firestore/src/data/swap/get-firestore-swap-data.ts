import { CollectionName } from '../../constants/collection-name'
import { convertSwap } from '../../converters/swap/convert-swap'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreSwapData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertSwap))(CollectionName.SWAPS, documentPath)
