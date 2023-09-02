import { CollectionName } from '../../constants/collection-name'
import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { firestore } from '../../services/firestore'
import { nftCollectionFields } from '../../types/model/nft-collection-document-data'
import { NftCollection, QueryConstraints } from '@echo/firestore-types'
import { CollectionReference, Query } from 'firebase-admin/firestore'
import { invoker, map } from 'ramda'

export async function getAllNftCollections(constraints?: QueryConstraints) {
  let query: CollectionReference<NftCollection> | Query<NftCollection> = firestore()
    .collection(CollectionName.NFT_COLLECTIONS)
    .withConverter(nftCollectionDataConverter)

  query = addConstraintsToQuery(query, constraints, nftCollectionFields)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return [] as NftCollection[]
  }
  return map(invoker(0, 'data'), querySnapshot.docs) as NftCollection[]
}
