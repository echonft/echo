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
import type { Logger } from '@echo/utils/types/logger'
import { captureException, setUser, type User } from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

export function routeHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
): (req: NextRequest, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    const logger = getLogger().child({ component: 'api' }) as Logger
    try {
      await initializeFirebase({ logger })
      const user = await getAuthUser()
      setUser(user as User)
      return await requestHandler({ req, logger, params: context?.params as Params })
    } catch (err) {
      logger.error({ err, fn: 'routeHandler' })
      if (err instanceof ApiError) {
        await err.beforeError()
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
