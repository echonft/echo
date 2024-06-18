import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { auth } from '@echo/frontend/lib/auth/auth'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import type {
  RequestHandler,
  RequestWithParamsHandler
} from '@echo/frontend/lib/types/request-handlers/request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import type { Logger } from '@echo/utils/types/logger'
import { captureException, setUser } from '@sentry/nextjs'
import type { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'
import { isNil, pick } from 'ramda'

export function routeHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | RequestWithParamsHandler<ResponseBody, RequestBody, Params>
    | RequestHandler<ResponseBody, RequestBody>
) {
  return auth(async function (req: NextAuthRequest, context?: { params?: Record<string, string | string[]> }) {
    const logger = getLogger().child({ component: 'api' }) as Logger
    try {
      await initializeFirebase({ logger })
      const session = await auth()
      const user = session?.user
      setUser(isNil(user) ? null : pick(['username'], user))
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
