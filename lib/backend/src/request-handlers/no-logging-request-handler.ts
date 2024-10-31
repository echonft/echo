import { auth } from '@echo/backend/auth'
import { ApiError } from '@echo/backend/errors/api-error'
import { ServerError } from '@echo/backend/errors/server-error'
import type { AppRouteHandlerFnContext } from '@echo/backend/types/app-route-handler-fn-context'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { RequestHandler, RequestWithParamsHandler } from '@echo/backend/types/request-handler'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { NextAuthRequest } from 'next-auth/lib'

export function noLoggingRequestHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
): (req: NextRequest<RequestBody>, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
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
