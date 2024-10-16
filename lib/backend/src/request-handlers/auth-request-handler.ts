import { auth } from '@echo/auth/auth'
import { getAuthUser } from '@echo/auth/helpers/get-auth-user'
import type { NextAuthRequest } from '@echo/auth/types/next-auth-request'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { getLogger } from '@echo/backend/helpers/get-logger'
import { requestErrorHandler } from '@echo/backend/request-handlers/request-error-handler'
import type { AppRouteHandlerFnContext } from '@echo/backend/types/app-route-handler-fn-context'
import type { AuthRequestHandler, AuthRequestWithParamsHandler } from '@echo/backend/types/auth-request-handler'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { setUser } from '@sentry/nextjs'
import { type NextRequest } from 'next/server'
import { isNil } from 'ramda'

export function authRequestHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | AuthRequestHandler<ResponseBody, RequestBody>
    | AuthRequestWithParamsHandler<ResponseBody, RequestBody, Params>
): (req: NextRequest, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context: { params?: Record<string, string | string[]> }) {
    const logger = getLogger().child({ component: 'api' })
    try {
      await initializeFirebase({ logger })
      const user = await getAuthUser()
      if (isNil(user)) {
        return new UnauthorizedError().getErrorResponse()
      }
      setUser(user)
      return await requestHandler({ req, logger, user, params: context.params as Params })
    } catch (err) {
      return requestErrorHandler({ err, logger })
    }
  })
}
