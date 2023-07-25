/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreUser } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { firestore } from 'firebase-admin'
import { always, assoc, call, converge, identity, ifElse, invoker, isNil, partial, pick, pipe, prop } from 'ramda'
import WriteResult = firestore.WriteResult

// if updatedAt is undefined, we use Date.now()
// this field is useful for testing only
interface Parameters {
  userId: string
  updatedAt?: number
}

export const setUserUpdatedAt = (args: Parameters): Promise<R.Result<WriteResult, Error>> =>
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
      always(R.fromPromise(Promise.reject('User not found'))),
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
        ]),
        // @ts-ignore
        R.fromPromise
      )
    )
    // @ts-ignore
  )(args)
