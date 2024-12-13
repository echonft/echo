import { swapDocumentToModel } from '@echo/firestore/converters/swap-document-to-model'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { User } from '@echo/model/types/user'
import { setSwapRoleForUser } from '@echo/ui/helpers/swap/set-swap-role-for-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function toSwapWithRole(user: Nullable<User>) {
  return function (swap: SwapDocument) {
    return pipe(swapDocumentToModel, setSwapRoleForUser(user))(swap)
  }
}
