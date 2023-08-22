import { removeWalletSchema } from '../../types/validators/remove-wallet-schema'
import { ApiError } from '../api-error'
import { WalletRequest } from '@echo/api-public'

export const parseRemoveWalletRequest = (request: WalletRequest) => {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, 'Invalid request')
  }
}
