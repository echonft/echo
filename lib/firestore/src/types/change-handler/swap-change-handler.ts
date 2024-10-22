import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Swap } from '@echo/model/types/swap/swap'

export type SwapChangeHandlerArgs = ChangeHandlerArgs<Swap, SwapDocumentData>
export type SwapChangeHandler = ChangeHandler<Swap, SwapDocumentData>
