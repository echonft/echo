import { CollectionName } from '../../config/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { mapNft } from '../../mappers/nft/map-nft'
import { mapTraitFilters } from '../../mappers/nft/map-trait-filters'
import { FirestoreNft } from '../../types/model/collections/nft/firestore-nft'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { getDocsFromQuery } from '../../utils/query/get-docs-from-query'
import { Nft, NftTraits } from '@echo/model'
import { promiseAll } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { query, where } from 'firebase/firestore'
import { andThen, isNil, map, pipe } from 'ramda'

export const findNftsForCollectionByTraits = (
  collectionId: string,
  traits?: NftTraits
): Promise<R.Result<Nft[], Error>> => {
  const nftsRef = getCollectionFromPath<FirestoreNft>(CollectionName.NFTS)
  const nftCollectionRef = getDocRefFromPath<FirestoreNftCollection>(CollectionName.NFT_COLLECTIONS, collectionId)
  const constraints = [where('collection', '==', nftCollectionRef)]
  if (!isNil(traits)) {
    const attributes = mapTraitFilters(traits)
    constraints.push(where('attributes', 'array-contains-any', attributes))
  }
  return pipe(
    andThen(pipe(map(convertNft), map(mapNft), promiseAll)),
    R.fromPromise
  )(getDocsFromQuery(query(nftsRef, ...constraints)))
}
