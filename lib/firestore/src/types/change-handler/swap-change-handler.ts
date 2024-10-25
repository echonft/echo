import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'

export type SwapChangeHandlerArgs = ChangeHandlerArgs<SwapDocument>
export type SwapChangeHandler = ChangeHandler<SwapDocument>
