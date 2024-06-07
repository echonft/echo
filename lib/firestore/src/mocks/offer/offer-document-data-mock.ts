import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { always, assoc, converge, dissoc, identity, pipe, prop } from 'ramda'

function getDocumentData(offerId: string): OfferDocumentData {
  return pipe(
    getOfferMockById,
    dissoc('readOnly'),
    converge(assoc, [always('receiverItemIndexes'), pipe(prop('receiverItems'), getNftIndexForNfts), identity]),
    converge(assoc, [always('senderItemIndexes'), pipe(prop('senderItems'), getNftIndexForNfts), identity]),
    converge(assoc, [always('receiverItemCollections'), pipe(prop('receiverItems'), getNftsCollectionSlugs), identity]),
    converge(assoc, [always('senderItemCollections'), pipe(prop('senderItems'), getNftsCollectionSlugs), identity])
  )(offerId) as unknown as OfferDocumentData
}

export function offerDocumentDataMock(): Record<string, OfferDocumentData> {
  return {
    LyCfl6Eg7JKuD7XJ6IPi: getDocumentData(offerMockToJohnnycageId()),
    ASkFpKoHEHVH0gd69t1G: getDocumentData(offerMockFromJohnnycageId())
  }
}
