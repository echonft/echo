import { ApiError } from '../helpers/error/api-error'
import { RequestHandler } from '../types/request-handlers/request-handler'
import { ApiRequest, ApiResponse } from '@echo/api-public'
import { initializeFirebase } from '@echo/firestore'
import { errorMessage } from '@echo/utils'
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
