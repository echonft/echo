import { GetOwnersForNftRequest } from '@echo/alchemy'
import { FirestoreNftData } from '@echo/firestore'
import { applySpec, path, prop } from 'ramda'

export const mapNftToNftIdWithContractAddress: (nft: FirestoreNftData) => GetOwnersForNftRequest = applySpec({
  tokenId: prop('tokenId'),
  contractAddress: path(['collection', 'contract', 'address'])
})
