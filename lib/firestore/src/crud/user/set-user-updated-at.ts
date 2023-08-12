/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CollectionName } from '../../config/collection-name'
import { FirestoreUser } from '../../types/model/collections/user/firestore-user'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { errorPromise } from '@echo/utils'
import { WriteResult } from '@google-cloud/firestore'
import { always, assoc, call, converge, identity, ifElse, invoker, isNil, partial, pick, pipe, prop } from 'ramda'

// if updatedAt is undefined, we use Date.now()
// this field is useful for testing only
interface Arguments {
  userId: string
  updatedAt?: number
}

export const setUserUpdatedAt = (args: Arguments): Promise<WriteResult> =>
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  pipe(
    // @ts-ignore
    converge(assoc, [
      always('ref'),
      pipe(prop('userId'), partial(getDocRefFromPath<FirestoreUser>, [CollectionName.USERS])),
      identity
    ]),
    // @ts-ignore
    ifElse(
      pipe(prop('ref'), isNil),
      errorPromise('User not found'),
      // @ts-ignore
      pipe(
        converge(call, [
          // @ts-ignore
          pipe(
            // @ts-ignore
            ifElse(pipe(prop('updatedAt'), isNil), always({ updatedAt: Date.now() }), pick(['updatedAt'])),
            invoker(1, 'update')
          ),
          prop('ref')
        ])
      )
    )
    // @ts-ignore
  )(args)
