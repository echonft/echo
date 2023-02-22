import { convertSwap } from '../../converters/swap/convert-swap'
import { ConvertSwapOptions } from '../../types/converter/swap/convert-swap-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { FirestoreSwap } from '@echo/firestore'

export const getFirestoreSwapData = (documentPath: string, options: ConvertSwapOptions) =>
  getDocSnapshot<FirestoreSwap>('swaps', documentPath).then(convertSwap(options))
