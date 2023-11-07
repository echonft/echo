import type { ApiRequest } from '@echo/api/types/api-request'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { type RequestHandler } from '@echo/frontend/lib/server/types/request-handlers/request-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { captureException, setUser } from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { isNil, pick } from 'ramda'

export function handleRequest<TArgs extends unknown[], TResponseBody>(
  request: ApiRequest<unknown>,
  requestHandler: RequestHandler<TArgs, TResponseBody>
) {
  return async function (...args: TArgs) {
    {
      try {
        initializeFirebase()
        const user = await getUserFromRequest(request)
        setUser(isNil(user) ? null : pick(['id', 'username'], user))
        return await requestHandler(...args)
      } catch (error) {
        if (error instanceof ApiError) {
          await error.beforeError()
          return error.getErrorResponse()
        } else {
          captureException(error)
          return NextResponse.json(
            {
              error: errorMessage(error)
            },
            { status: 500 }
          )
        }
      }
    }
  }
}
