import { auth } from '@echo/auth/auth'
import { getAuthUser } from '@echo/auth/get-auth-user'
import type { AppRouteHandlerFnContext } from '@echo/auth/types/app-route-handler-fn-context'
import type { NextAuthRequest } from '@echo/auth/types/next-auth-request'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { UnauthorizedError } from '@echo/frontend/lib/helpers/error/unauthorized-error'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import { requestErrorHandler } from '@echo/frontend/lib/request-handlers/request-error-handler'
import type {
  AuthRequestHandler,
  AuthRequestWithParamsHandler
} from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { setUser, type User } from '@sentry/nextjs'
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
      setUser(user as User)
      return await requestHandler({ req, logger, user, params: context.params as Params })
    } catch (err) {
      return requestErrorHandler({ err, logger })
    }
  })
}
