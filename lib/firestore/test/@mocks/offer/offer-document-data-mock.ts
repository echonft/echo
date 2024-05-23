import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID, OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
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

export const offerDocumentDataMock: Record<string, OfferDocumentData> = {
  LyCfl6Eg7JKuD7XJ6IPi: getDocumentData(OFFER_MOCK_TO_JOHNNYCAGE_ID),
  ASkFpKoHEHVH0gd69t1G: getDocumentData(OFFER_MOCK_FROM_JOHNNYCAGE_ID)
}
