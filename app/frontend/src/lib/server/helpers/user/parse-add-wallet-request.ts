import { addWalletSchema } from '../../validators/add-wallet-schema'
import { BadRequestError } from '../error/bad-request-error'
import { AddWalletRequest } from '@echo/api-public'

export const parseAddWalletRequest = (request: AddWalletRequest) => {
  try {
    return addWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
