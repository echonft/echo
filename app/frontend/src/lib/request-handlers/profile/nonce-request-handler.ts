import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { andThen, isNil, pick, pipe } from 'ramda'
import { generateNonce } from 'siwe'

export async function nonceRequestHandler({ user: { username } }: AuthRequestHandlerArgs) {
  const foundUser = await getUserByUsername(username)
  if (isNil(foundUser)) {
    return Promise.reject(new NotFoundError())
  }
  return pipe(setNonceForUser, andThen(pipe(pick(['nonce']), toNextReponse)))(foundUser.username, generateNonce())
}
