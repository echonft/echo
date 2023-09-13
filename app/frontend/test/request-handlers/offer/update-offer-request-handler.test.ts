import { UpdateOfferAction } from '@echo/api/constants/update-offer-action'
import type { UpdateOfferRequest } from '@echo/api/types/requests/update-offer-request'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { mockRequest } from '@mocks/request-response'
import { getSession } from '@server/helpers/auth/get-session'
import { ApiError } from '@server/helpers/error/api-error'
import { getUserById } from '@server/helpers/user/get-user-by-id'
import { handleAcceptOffer } from '@server/request-handlers/offer/handle-accept-offer'
import { handleCancelOffer } from '@server/request-handlers/offer/handle-cancel-offer'
import { handleRejectOffer } from '@server/request-handlers/offer/handle-reject-offer'
import { updateOfferRequestHandler } from '@server/request-handlers/offer/update-offer-request-handler'
import type { AuthOptions, Session } from 'next-auth'

jest.mock('@server/helpers/auth/get-session')
jest.mock('@server/helpers/user/get-user-by-id')
jest.mock('@server/request-handlers/offer/handle-accept-offer')
jest.mock('@server/request-handlers/offer/handle-cancel-offer')
jest.mock('@server/request-handlers/offer/handle-reject-offer')

describe('request-handlers - offer - updateOfferRequestHandler', () => {
  const id = 'offerId'
  const session = {
    user: {
      id: 'userId'
    }
  } as unknown as Session

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<UpdateOfferRequest>({} as UpdateOfferRequest)
    try {
      await updateOfferRequestHandler(req, {} as AuthOptions, id)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<UpdateOfferRequest>({
      action: UpdateOfferAction.ACCEPT
    })
    try {
      await updateOfferRequestHandler(req, {} as AuthOptions, id)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('if authenticated and request action is ACCEPT, handleAcceptOffer should be called', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as FirestoreUser)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(handleAcceptOffer).mockResolvedValueOnce()
    const req = mockRequest<UpdateOfferRequest>({
      action: UpdateOfferAction.ACCEPT
    })
    await updateOfferRequestHandler(req, {} as AuthOptions, id)
    expect(handleAcceptOffer).toHaveBeenCalledTimes(1)
  })

  it('if authenticated and request action is CANCEL, handleCancelOffer should be called', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as FirestoreUser)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(handleCancelOffer).mockResolvedValueOnce()
    const req = mockRequest<UpdateOfferRequest>({
      action: UpdateOfferAction.CANCEL
    })
    await updateOfferRequestHandler(req, {} as AuthOptions, id)
    expect(handleCancelOffer).toHaveBeenCalledTimes(1)
  })

  it('if authenticated and request action is REJECT, handleRejectOffer should be called', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as FirestoreUser)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(handleRejectOffer).mockResolvedValueOnce()
    const req = mockRequest<UpdateOfferRequest>({
      action: UpdateOfferAction.REJECT
    })
    await updateOfferRequestHandler(req, {} as AuthOptions, id)
    expect(handleRejectOffer).toHaveBeenCalledTimes(1)
  })
})
