import type { ApiRequest } from '@echo/api/types/api-request'
import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { updateUserSchema } from '@echo/frontend/lib/server/validators/update-user-schema'

export async function updateUserRequestHandler(req: ApiRequest<UpdateUserRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<UpdateUserRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const parsedBody = guardFn((requestBody) => updateUserSchema.parse(requestBody), ErrorStatus.BAD_REQUEST)(requestBody)
  await guardAsyncFn(updateUser, ErrorStatus.SERVER_ERROR)(parsedBody)
  return emptyResponse()
}
