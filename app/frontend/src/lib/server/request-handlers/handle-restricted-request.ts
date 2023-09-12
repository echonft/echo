import { ApiError } from '../helpers/error/api-error'
import { RestrictedRequestHandler } from '../types/request-handlers/restricted-request-handler'
import type { ApiRequest, ApiResponse } from '@echo/api/types'
import { initializeFirebase } from '@echo/firestore'
import errorMessage from '@echo/utils/error-message'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'

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
