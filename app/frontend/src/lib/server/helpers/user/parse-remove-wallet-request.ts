import { removeWalletSchema } from '../../validators/remove-wallet-schema'
import { BadRequestError } from '../error/bad-request-error'
import { RemoveWalletRequest } from '@echo/api'

export const parseRemoveWalletRequest = (request: RemoveWalletRequest) => {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
