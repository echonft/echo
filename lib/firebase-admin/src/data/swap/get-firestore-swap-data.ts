import { convertSwap } from '../../converters/swap/convert-swap'
import { ConvertSwapOptions } from '../../types/converter/swap/convert-swap-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreSwapData = (documentPath: string, options: ConvertSwapOptions) =>
  pipe(getDocSnapshot, andThen(convertSwap(options)))('swaps', documentPath)
