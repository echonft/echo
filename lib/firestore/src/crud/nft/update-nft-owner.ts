import { CollectionName } from '../../config/collection-name'
import { FirestoreUser } from '../../types/model/collections/user/firestore-user'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { errorMessage } from '@echo/utils'
import { isNil } from 'ramda'

export const updateNftOwner = (nftId: string, userId: string) => {
  const nftRef = getDocRefFromPath<FirestoreUser>(CollectionName.NFTS, nftId)
  if (isNil(nftRef)) {
    return Promise.reject('nft not found')
  }
  return nftRef
    .get()
    .then(() => {
      const userRef = getDocRefFromPath<FirestoreUser>(CollectionName.USERS, userId)
      if (isNil(userRef)) {
        return Promise.reject('user not found')
      }
      return userRef
        .get()
        .then(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return nftRef.update({ owner: userRef })
        })
        .catch((e) => Promise.reject(`user not found: ${errorMessage(e)}`))
    })
    .catch((e) => Promise.reject(`nft not found: ${errorMessage(e)}`))
}
