import { auth } from '@echo/auth/auth'
import type { AppRouteHandlerFnContext } from '@echo/auth/types/app-route-handler-fn-context'
import type { NextAuthRequest } from '@echo/auth/types/next-auth-request'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { ServerError } from '@echo/frontend/lib/helpers/error/server-error'
import type {
  RequestHandler,
  RequestWithParamsHandler
} from '@echo/frontend/lib/types/request-handlers/request-handler'
import { type NextRequest } from 'next/server'

export function noLoggingRequestHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
): (req: NextRequest, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    try {
      await initializeFirebase()
      return await requestHandler({ req, params: context?.params as Params })
    } catch (err) {
      if (err instanceof ApiError) {
        return err.getErrorResponse()
      } else {
        // unknown error
        return new ServerError().getErrorResponse()
      }
    }
  })
}
