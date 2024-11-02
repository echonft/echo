import { cancelListing } from '@echo/backend/actions/cancel-listing'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/auth/get-auth-user'
import { cancelListing as firestoreCancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, modify } from 'ramda'

jest.mock('@echo/backend/helpers/auth/get-auth-user')
jest.mock('@echo/firestore/services/initialize-firebase')
jest.mock('@echo/firestore/crud/listing/get-listing')
jest.mock('@echo/firestore/crud/listing/cancel-listing')

describe('request-handlers - listing - cancelListing', () => {
  const slug = listingDocumentMock.slug

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getAuthUser).mockResolvedValue(userMockJohnny)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.mocked(initializeFirebase).mockImplementation(() => {})
  })

  it('throws if the listing does not exist', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(undefined)
    await expect(cancelListing(slug)).rejects.toEqual(Error(ListingError.NotFound))
  })

  it('throws if the listing is locked', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(assoc('locked', true, listingDocumentMock))

    await expect(cancelListing(slug)).rejects.toEqual(Error(AuthError.Forbidden))
  })

  it('throws if the user is not the listing creator', async () => {
    jest
      .mocked(getListing)
      .mockResolvedValueOnce(modify('creator', assoc('username', 'another-user'), listingDocumentMock))
    await expect(cancelListing(slug)).rejects.toEqual(Error(AuthError.Forbidden))
  })

  it('returns a 200', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(listingDocumentMock)
    const updatedListing = assoc('state', ListingState.Cancelled, listingDocumentMock)
    jest.mocked(firestoreCancelListing).mockResolvedValueOnce(updatedListing)
    const result = await cancelListing(slug)
    expect(firestoreCancelListing).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(assoc('state', ListingState.Cancelled, listingMock))
  })
})
