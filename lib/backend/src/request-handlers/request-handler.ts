import { auth } from '@echo/backend/auth'
import { getAuthUser } from '@echo/backend/helpers/auth/get-auth-user'
import { requestErrorHandler } from '@echo/backend/request-handlers/request-error-handler'
import type { AppRouteHandlerFnContext } from '@echo/backend/types/app-route-handler-fn-context'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { RequestHandler, RequestWithParamsHandler } from '@echo/backend/types/request-handler'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { setUser } from '@sentry/nextjs'
import type { NextAuthRequest } from 'next-auth/lib'
import { andThen, pipe } from 'ramda'

export function requestHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
): (req: NextRequest<RequestBody>, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    try {
      await initializeFirebase()
      await pipe(getAuthUser, andThen(setUser))()
      return await requestHandler({ req, params: context?.params as Params })
    } catch (err) {
      return requestErrorHandler(err)
    }
  })
}
