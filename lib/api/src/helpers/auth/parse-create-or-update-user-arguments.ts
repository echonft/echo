import { CreateOrUpdateUserArguments } from '../../types/auth/create-or-update-user-arguments'
import { createOrUpdateUserArgumentsSchema } from '../../validators/create-or-update-user-arguments-schema'
import { ApiError } from '../error/api-error'
import { errorMessage } from '@echo/utils'

export const parseCreateOrUpdateUserArguments = (args: CreateOrUpdateUserArguments) => {
  try {
    return createOrUpdateUserArgumentsSchema.parse(args)
  } catch (e) {
    throw new ApiError(400, `Invalid arguments: ${errorMessage(e)}`)
  }
}
