import type { ApiRequest } from '@echo/api/types/api-request'
import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { updateUserSchema } from '@echo/frontend/lib/validators/update-user-schema'
import { NextResponse } from 'next/server'

export async function updateUserRequestHandler(req: ApiRequest<UpdateUserRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<UpdateUserRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const parsedBody = guardFn((requestBody) => updateUserSchema.parse(requestBody), ErrorStatus.BAD_REQUEST)(requestBody)
  await guardAsyncFn(updateUser, ErrorStatus.SERVER_ERROR)(parsedBody)
  return NextResponse.json({})
}
