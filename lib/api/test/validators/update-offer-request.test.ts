import { UpdateOfferAction } from '../../src/types/helper/update-offer-action'
import { updateOfferRequestSchema } from '../../src/types/validators/update-offer-request'
import { describe, expect, it } from '@jest/globals'

describe('validators - updateOfferRequest', () => {
  it('wrong id fails validation', () => {
    expect(() => updateOfferRequestSchema.parse({ id: '', action: UpdateOfferAction.ACCEPT })).toThrow()
    expect(() => updateOfferRequestSchema.parse({ id: undefined, action: UpdateOfferAction.ACCEPT })).toThrow()
    expect(() => updateOfferRequestSchema.parse({ id: 0, action: UpdateOfferAction.ACCEPT })).toThrow()
  })
  it('wrong action fails validation', () => {
    expect(() => updateOfferRequestSchema.parse({ id: '1', action: undefined })).toThrow()
    expect(() => updateOfferRequestSchema.parse({ id: '1', action: 'UpdateOfferAction.ACCEPT' })).toThrow()
    expect(() => updateOfferRequestSchema.parse({ id: '1', action: 10 })).toThrow()
  })
  it('valid data pass', () => {
    expect(updateOfferRequestSchema.parse({ id: '1', action: UpdateOfferAction.ACCEPT })).toStrictEqual({
      id: '1',
      action: UpdateOfferAction.ACCEPT
    })
    expect(updateOfferRequestSchema.parse({ id: 'TeStId1234', action: UpdateOfferAction.CANCEL })).toStrictEqual({
      id: 'TeStId1234',
      action: UpdateOfferAction.CANCEL
    })
    expect(updateOfferRequestSchema.parse({ id: 'TeStId1234', action: UpdateOfferAction.REJECT })).toStrictEqual({
      id: 'TeStId1234',
      action: UpdateOfferAction.REJECT
    })
  })
})
