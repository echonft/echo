import { idThrower } from './id-thrower'
import { FirestoreNftData, nftFirestoreData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { any, equals, isNil } from 'ramda'

export const mockFindNftsByIds = (ids: string[]) => {
  if (any(equals('reject'), ids)) {
    return Promise.reject(new Error('not found'))
  }
  return Promise.all(
    ids.map((id) => {
      const nft = nftFirestoreData[id]
      idThrower(id)
      return R.fromPromise<FirestoreNftData>(isNil(nft) ? Promise.reject('not found') : Promise.resolve(nft))
    })
  )
}
