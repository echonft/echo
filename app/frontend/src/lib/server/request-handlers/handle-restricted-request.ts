import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { ApiResponse } from '@echo/api/types/base/api-response'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { errorMessage } from '@echo/utils/error/error-message'
import { ApiError } from '@server/helpers/error/api-error'
import type { RestrictedRequestHandler } from '@server/types/request-handlers/restricted-request-handler'
import { NextResponse } from 'next/server'
import type { AuthOptions } from 'next-auth'

export async function handleRestrictedRequest<ResponseBody, RequestBody = never>(
  req: ApiRequest<RequestBody>,
  authOptions: AuthOptions,
  requestHandler: RestrictedRequestHandler<ResponseBody, RequestBody>,
  ...args: unknown[]
): Promise<ApiResponse<ResponseBody>> {
  try {
    initializeFirebase()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await requestHandler(req, authOptions, ...args)
  } catch (error) {
    if (error instanceof ApiError) {
      return error.getErrorResponse()
    } else {
      return NextResponse.json(
        {
          error: errorMessage(error)
        },
        { status: 500 }
      )
    }
  }
}
