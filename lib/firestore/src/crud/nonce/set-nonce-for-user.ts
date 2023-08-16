import { CollectionName } from '../../constants/collection-name'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { always } from 'ramda'
import { generateNonce } from 'siwe'

export const setNonceForUser = (userId: string): Promise<string> => {
  const nonce = generateNonce()
  return getCollectionFromPath(CollectionName.NONCES).doc(userId).set({ nonce }).then(always(nonce))
}
