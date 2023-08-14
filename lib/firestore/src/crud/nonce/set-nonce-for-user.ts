import { CollectionName } from '../../config/collection-name'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { always } from 'ramda'
import { generateNonce } from 'siwe'

export const setNonceForUser = (userId: string): Promise<string> => {
  const nonce = generateNonce()
  return getCollectionFromPath(CollectionName.NONCES).doc(userId).set({ nonce }).then(always(nonce))
}
