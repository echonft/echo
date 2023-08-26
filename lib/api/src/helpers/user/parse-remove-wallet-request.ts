import { removeWalletSchema } from '../../validators/remove-wallet-schema'
import { ApiError } from '../error/api-error'
import { WalletRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'

export const parseRemoveWalletRequest = (request: WalletRequest) => {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
