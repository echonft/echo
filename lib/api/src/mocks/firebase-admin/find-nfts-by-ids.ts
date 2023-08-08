import { nftFirestoreData } from '@echo/firestore'
import { idThrower } from '@echo/utils'
import { any, equals, isNil } from 'ramda'

export const mockFindNftsByIds = (ids: string[]) => {
  if (any(equals('reject'), ids)) {
    return Promise.reject('not found')
  }
  return Promise.all(
    ids.map((id) => {
      const nft = nftFirestoreData[id]
      idThrower(id)
      if (isNil(nft)) {
        return Promise.reject('not found')
      }
      return Promise.resolve(nft)
    })
  )
}
