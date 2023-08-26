import { addWalletSchema } from '../../validators/add-wallet-schema'
import { ApiError } from '../error/api-error'
import { WalletRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'
import { SiweMessage } from 'siwe'

export const parseAddWalletRequest = (request: WalletRequest & { message: SiweMessage }) => {
  try {
    return addWalletSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
