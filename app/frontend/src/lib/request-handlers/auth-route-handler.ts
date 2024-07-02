import { auth } from '@echo/auth/auth'
import { getAuthUser } from '@echo/auth/get-auth-user'
import type { AppRouteHandlerFnContext } from '@echo/auth/types/app-route-handler-fn-context'
import type { NextAuthRequest } from '@echo/auth/types/next-auth-request'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import type {
  AuthRequestHandler,
  AuthRequestWithParamsHandler
} from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException, setUser, type User } from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

import { isNil } from 'ramda'

export function authRouteHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | AuthRequestHandler<ResponseBody, RequestBody>
    | AuthRequestWithParamsHandler<ResponseBody, RequestBody, Params>
): (req: NextRequest, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context: { params?: Record<string, string | string[]> }) {
    const logger = getLogger().child({ fn: authRouteHandler.name })
    try {
      await initializeFirebase({ logger })
      const user = await getAuthUser()
      if (isNil(user)) {
        logger.warn({ fn: 'routeHandler' }, 'unauthorized')
        return NextResponse.json<ErrorResponse>(
          {
            error: 'Unauthorized'
          },
          { status: ErrorStatus.UNAUTHORIZED }
        )
      }
      setUser(user as User)
      return await requestHandler({ req, logger, user, params: context.params as Params })
    } catch (err) {
      logger.error({ err, fn: 'routeHandler' })
      if (err instanceof ApiError) {
        return err.getErrorResponse()
      } else {
        captureException(err)
        return NextResponse.json<ErrorResponse>(
          {
            error: errorMessage(err)
          },
          { status: 500 }
        )
      }
    }
  })
}
