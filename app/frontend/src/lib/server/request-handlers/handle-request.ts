import type { ApiRequest } from '@echo/api/types/api-request'
import type { ApiResponse } from '@echo/api/types/api-response'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { errorMessage } from '@echo/utils/error/error-message'
import { ApiError } from '@server/helpers/error/api-error'
import type { RequestHandler } from '@server/types/request-handlers/request-handler'
import { NextResponse } from 'next/server'

export async function handleRequest<ResponseBody, RequestBody = never>(
  req: ApiRequest<RequestBody>,
  requestHandler: RequestHandler<ResponseBody, RequestBody>,
  ...args: unknown[]
): Promise<ApiResponse<ResponseBody>> {
  try {
    initializeFirebase()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await requestHandler(req, ...args)
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
