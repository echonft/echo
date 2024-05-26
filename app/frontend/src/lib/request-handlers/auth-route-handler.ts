import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { auth } from '@echo/frontend/lib/auth/auth'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import type { AuthRequestHandler } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException, setUser } from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import type { NextAuthRequest } from 'next-auth/lib'
import { isNil, pick } from 'ramda'

export function authRouteHandler<RequestBody, ResponseBody, Params extends object = never>(
  requestHandler: AuthRequestHandler<RequestBody, ResponseBody, Params>
) {
  return auth(async function (request: NextAuthRequest, context: { params?: Record<string, string | string[]> }) {
    try {
      initializeFirebase()
      const session = await auth()
      const user = session?.user
      if (isNil(user)) {
        return NextResponse.json<ErrorResponse>(
          {
            error: 'Unauthorized'
          },
          { status: ErrorStatus.UNAUTHORIZED }
        )
      }
      setUser(pick(['username'], user))
      if (isNil(context.params)) {
        return await requestHandler(user, request)
      }
      return await requestHandler(user, request, context.params as Params)
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
  })
}
