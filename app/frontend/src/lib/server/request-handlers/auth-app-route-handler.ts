import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { auth } from '@echo/frontend/lib/helpers/auth/auth'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import type { AuthRequestHandler } from '@echo/frontend/lib/server/types/request-handlers/auth-request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException, setUser } from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import type { NextAuthRequest } from 'next-auth/lib'
import { isNil, pick } from 'ramda'

export function authAppRouteHandler<
  RequestBody,
  ResponseBody,
  Params extends Record<string, unknown> | undefined = undefined
>(requestHandler: AuthRequestHandler<RequestBody, ResponseBody, Params>) {
  return auth(async function (request: NextAuthRequest, context?: { params: Params }) {
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
      return await requestHandler(user, request, context?.params as Params)
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
