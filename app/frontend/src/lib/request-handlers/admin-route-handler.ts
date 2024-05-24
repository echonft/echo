import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { assertAdminToken } from '@echo/frontend/lib/helpers/admin/assert/assert-admin-token'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import type { RequestHandler } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException } from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { isNil } from 'ramda'

export function adminRouteHandler<RequestBody, ResponseBody, Params extends object = never>(
  requestHandler: RequestHandler<RequestBody, ResponseBody, Params>
) {
  return async function (request: NextRequest, context?: { params: Params }) {
    try {
      initializeFirebase()
      assertAdminToken()
      if (isNil(context)) {
        return await requestHandler(request)
      }
      return await requestHandler(request, context.params)
    } catch (error) {
      if (error instanceof ApiError) {
        await error.beforeError()
        return error.getErrorResponse()
      } else {
        captureException(error)
        return NextResponse.json<ErrorResponse>(
          {
            error: errorMessage(error)
          },
          { status: 500 }
        )
      }
    }
  }
}
