import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { auth } from '@echo/frontend/lib/auth/auth'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import type { RequestHandler } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException, setUser } from '@sentry/nextjs'
import type { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'
import { isNil, pick } from 'ramda'

export function routeHandler<RequestBody, ResponseBody, Params extends Record<string, unknown> = never>(
  requestHandler: RequestHandler<RequestBody, ResponseBody, Params>
) {
  return auth(async function (request: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    try {
      await initializeFirebase()
      const session = await auth()
      const user = session?.user
      setUser(isNil(user) ? null : pick(['username'], user))
      if (isNil(context)) {
        return await requestHandler(request)
      }
      return await requestHandler(request, context.params as Params)
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
