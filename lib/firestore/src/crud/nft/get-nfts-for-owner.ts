import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { firestore } from '../../services/firestore'
import { nftFields } from '../../types/model/nft-document-data'
import { Nft, QueryConstraints } from '@echo/firestore-types'
import { invoker, map } from 'ramda'

export async function getNftsForOwner(userId: string, constraints?: QueryConstraints) {
  let query = firestore()
    .collection(CollectionName.NFTS)
    .where('owner.id', '==', userId)
    .withConverter(nftDataConverter)

  query = addConstraintsToQuery(query, constraints, nftFields)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return [] as Nft[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Nft[]
}
