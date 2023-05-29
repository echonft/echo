import { idRejecter } from './id-rejecter'
import { idThrower } from './id-thrower'
import { FirestoreNftData, nftFirestoreData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { any, equals, isNil } from 'ramda'

export const mockFindNftsById = (ids: string[]) => {
  if (any(equals('reject'), ids)) {
    return Promise.reject(new Error('not found'))
  }
  return Promise.all(
    ids.map((id) => {
      const nft = nftFirestoreData[id]
      idThrower(id)
      if (idRejecter(id)) {
        return Promise.reject(new Error('not found'))
      }
      return R.fromPromise<FirestoreNftData>(isNil(nft) ? Promise.reject('not found') : Promise.resolve(nft))
    })
  )
}
