import { auth } from '@echo/auth/auth'
import { getAuthUser } from '@echo/auth/helpers/get-auth-user'
import type { NextAuthRequest } from '@echo/auth/types/next-auth-request'
import { getLogger } from '@echo/backend/helpers/get-logger'
import { requestErrorHandler } from '@echo/backend/request-handlers/request-error-handler'
import type { AppRouteHandlerFnContext } from '@echo/backend/types/app-route-handler-fn-context'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { RequestHandler, RequestWithParamsHandler } from '@echo/backend/types/request-handler'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { setUser } from '@sentry/nextjs'
import { andThen, pipe } from 'ramda'

export function requestHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
): (req: NextRequest<RequestBody>, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    const logger = getLogger().child({ component: 'api' })
    try {
      await initializeFirebase({ logger })
      await pipe(getAuthUser, andThen(setUser))()
      return await requestHandler({ req, logger, params: context?.params as Params })
    } catch (err) {
      return requestErrorHandler({ err, logger })
    }
  })
}
