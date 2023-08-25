import { addWalletSchema } from '../../validators/add-wallet-schema'
import { ApiError } from '../error/api-error'
import { AddWalletRequest } from '@echo/api-public'
import { errorMessage } from '@echo/utils'

export const parseAddWalletRequest = (request: AddWalletRequest) => {
  try {
    return addWalletSchema.parse(request)
  } catch (e) {
    throw new ApiError(400, `Invalid request: ${errorMessage(e)}`)
  }
}
