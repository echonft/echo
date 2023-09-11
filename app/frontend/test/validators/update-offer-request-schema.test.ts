import UpdateOfferAction from '@echo/api/constants/update-offer-action'
import { updateOfferRequestSchema } from '@server/validators/update-offer-request-schema'

describe('validators - updateOfferRequestSchema', () => {
  it('wrong action fails validation', () => {
    expect(() => updateOfferRequestSchema.parse({ action: undefined })).toThrow()
    expect(() => updateOfferRequestSchema.parse({ action: 'UpdateOfferAction.ACCEPT' })).toThrow()
    expect(() => updateOfferRequestSchema.parse({ action: 10 })).toThrow()
  })
  it('valid data pass', () => {
    expect(updateOfferRequestSchema.parse({ action: UpdateOfferAction.ACCEPT })).toStrictEqual({
      action: UpdateOfferAction.ACCEPT
    })
    expect(updateOfferRequestSchema.parse({ action: UpdateOfferAction.CANCEL })).toStrictEqual({
      action: UpdateOfferAction.CANCEL
    })
    expect(updateOfferRequestSchema.parse({ action: UpdateOfferAction.REJECT })).toStrictEqual({
      action: UpdateOfferAction.REJECT
    })
  })
})
