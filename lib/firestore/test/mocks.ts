import { collectionDocumentMockPx, collectionDocumentMockSpiral } from '@echo/firestore/mocks/collection-document-mock'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import {
  nftDocumentMockPx1,
  nftDocumentMockPx2,
  nftDocumentMockPx3,
  nftDocumentMockSpiral1,
  nftDocumentMockSpiral2,
  nftDocumentMockSpiral3
} from '@echo/firestore/mocks/nft-document-mock'
import {
  offerDocumentMockFromJohnnycage,
  offerDocumentMockToJohnnycage
} from '@echo/firestore/mocks/offer-document-mock'
import { userDocumentMockCrew, userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'

export const collectionDocumentMockPxId = 'Rc8pLQXxgyQGIRL0fr13'
export const collectionDocumentMocks = [collectionDocumentMockPx, collectionDocumentMockSpiral]
export const listingDocumentMockId = 'jUzMtPGKM62mMhEcmbN4'
export const listingDocumentMocks = [listingDocumentMock]
export const nftDocumentMockSpiral1Id = 'BhHFadIrrooORfTOLkBg'
export const nftDocumentMocks = [
  nftDocumentMockSpiral1,
  nftDocumentMockSpiral2,
  nftDocumentMockSpiral3,
  nftDocumentMockPx1,
  nftDocumentMockPx2,
  nftDocumentMockPx3
]
export const offerDocumentMockToJohnnycageId = 'LyCfl6Eg7JKuD7XJ6IPi'
export const offerDocumentMocks = [offerDocumentMockToJohnnycage, offerDocumentMockFromJohnnycage]
export const userDocumentMockJohnnyId = 'oE6yUEQBPn7PZ89yMjKn'
export const userDocumentMockCrewId = 'BrECUMhevHfxABZ1VNOm'
export const userDocumentMocks = [userDocumentMockCrew, userDocumentMockJohnny]
