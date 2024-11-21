import { auth } from '@echo/backend/auth/auth'
import type { AppRouteHandlerFnContext } from '@echo/backend/types/app-route-handler-fn-context'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { RequestHandler, RequestWithParamsHandler } from '@echo/backend/types/request-handler'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import type { NextAuthRequest } from 'next-auth/lib'

export function requestHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
): (req: NextRequest<RequestBody>, ctx: AppRouteHandlerFnContext) => void | Response | Promise<void | Response> {
  return auth(async function (req: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    await initializeFirestore()
    return await requestHandler({ req, params: context?.params as Params })
  })
}
