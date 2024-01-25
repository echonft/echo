import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guarded_assertAdminToken } from '@echo/frontend/lib/helpers/admin/assert/guarded_assert-admin-token'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import type { RequestHandler } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException } from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import type { NextAuthRequest } from 'next-auth/lib'
import { isNil } from 'ramda'

export function adminAppRouteHandler<RequestBody, ResponseBody, Params extends Record<string, unknown> = never>(
  requestHandler: RequestHandler<RequestBody, ResponseBody, Params>
) {
  return async function (request: NextAuthRequest, context?: { params: Params }) {
    try {
      initializeFirebase()
      guarded_assertAdminToken()
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
