import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { addNonce } from '@echo/firestore/crud/nonce/add-nonce'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { andThen, isNil, pick, pipe } from 'ramda'
import { generateNonce } from 'siwe'

export async function nonceRequestHandler({ user: { username } }: AuthRequestHandlerArgs) {
  const foundUser = await getUserByUsername(username)
  if (isNil(foundUser)) {
    return Promise.reject(new NotFoundError())
  }
  return pipe(addNonce, andThen(pipe(pick(['nonce']), toNextReponse)))(foundUser.username, generateNonce())
}
