import { auth } from '@echo/auth/auth'
import { getAuthUser } from '@echo/auth/get-auth-user'
import type { AppRouteHandlerFnContext } from '@echo/auth/types/app-route-handler-fn-context'
import type { NextAuthRequest } from '@echo/auth/types/next-auth-request'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import type {
  RequestHandler,
  RequestWithParamsHandler
} from '@echo/frontend/lib/types/request-handlers/request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException, setUser } from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

export function routeHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
): (req: NextRequest, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    const logger = getLogger().child({ component: 'api', fn: 'routeHandler' })
    try {
      await initializeFirebase({ logger })
      await pipe(getAuthUser, andThen(setUser))()
      return await requestHandler({ req, logger, params: context?.params as Params })
    } catch (err) {
      logger.error({ err })
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
