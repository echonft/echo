import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection/nft-collection-data-converter'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import { nftCollectionFields } from '@echo/firestore/types/model/nft-collection/nft-collection-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Query } from 'firebase-admin/lib/firestore'

export async function getAllNftCollections(constraints?: QueryConstraints) {
  let query = firestoreApp()
    .collection(CollectionName.NFT_COLLECTIONS)
    .withConverter(nftCollectionDataConverter) as Query<FirestoreNftCollection>
  query = addConstraintsToQuery(query, constraints, nftCollectionFields)
  return await getQueryDocumentsData(query)
}
