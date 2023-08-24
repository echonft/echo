import { addWalletSchema } from '../../types/validators/add-wallet-schema'
import { ApiError } from '../api-error'
import { WalletRequest } from '@echo/api-public'
import { SiweMessage } from 'siwe'

export const parseAddWalletRequest = (request: WalletRequest & { message: SiweMessage }) => {
  try {
    return addWalletSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, 'Invalid request')
  }
}
