import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { auth } from '@echo/frontend/lib/auth/auth'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import type {
  AuthRequestHandler,
  AuthRequestWithParamsHandler
} from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { captureException, setUser } from '@sentry/nextjs'
import type { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'
import { isNil, pick } from 'ramda'

export function authRouteHandler<ResponseBody, RequestBody = never, Params extends object = never>(
  requestHandler:
    | AuthRequestHandler<ResponseBody, RequestBody>
    | AuthRequestWithParamsHandler<ResponseBody, RequestBody, Params>
) {
  return auth(async function (req: NextAuthRequest, context: { params?: Record<string, string | string[]> }) {
    const logger = getBaseLogger('auth-route-handler')
    try {
      await initializeFirebase({ logger })
      const session = await auth()
      const user = session?.user
      if (isNil(user)) {
        logger.warn({ fn: 'routeHandler' }, 'unauthorized')
        return NextResponse.json<ErrorResponse>(
          {
            error: 'Unauthorized'
          },
          { status: ErrorStatus.UNAUTHORIZED }
        )
      }
      setUser(pick(['username'], user))
      return await requestHandler({ req, logger, user, params: context.params as Params })
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
    } finally {
      await terminateFirestore(logger)
    }
  })
}
