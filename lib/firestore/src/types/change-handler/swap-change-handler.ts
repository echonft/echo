import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'

export type SwapChangeHandlerArgs = ChangeHandlerArgs<SwapDocumentData, SwapDocumentData>
export type SwapChangeHandler = ChangeHandler<SwapDocumentData, SwapDocumentData>
