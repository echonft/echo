import { removeWalletSchema } from '../../validators/remove-wallet-schema'
import { ApiError } from '../error/api-error'
import { RemoveWalletRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'

export const parseRemoveWalletRequest = (request: RemoveWalletRequest) => {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
