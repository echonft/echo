import { createOrUpdateUserArgumentsSchema } from '../../validators/create-or-update-user-arguments-schema'
import { ApiError } from '../error/api-error'
import { errorMessage } from '@echo/utils'

export const parseCreateOrUpdateUserArguments = (args: {
  accessToken: string | undefined
  tokenType: string | undefined
  discordId: string | undefined
}) => {
  try {
    return createOrUpdateUserArgumentsSchema.parse(args)
  } catch (e) {
    throw new ApiError(400, `Invalid arguments: ${errorMessage(e)}`)
  }
}
