import { updateListingRequestSchema } from '../../src/validators/update-listing-request-schema'
import { UpdateListingAction } from '@echo/api-public'
import { describe, expect, it } from '@jest/globals'

describe('validators - updateListingRequestSchema', () => {
  it('wrong id fails validation', () => {
    expect(() => updateListingRequestSchema.parse({ id: '', action: UpdateListingAction.CANCEL })).toThrow()
    expect(() => updateListingRequestSchema.parse({ id: undefined, action: UpdateListingAction.CANCEL })).toThrow()
    expect(() => updateListingRequestSchema.parse({ id: 0, action: UpdateListingAction.CANCEL })).toThrow()
  })
  it('wrong action fails validation', () => {
    expect(() => updateListingRequestSchema.parse({ id: '1', action: undefined })).toThrow()
    expect(() => updateListingRequestSchema.parse({ id: '1', action: 'UpdateListingAction.CANCEL' })).toThrow()
    expect(() => updateListingRequestSchema.parse({ id: '1', action: 10 })).toThrow()
  })
  it('valid data pass', () => {
    expect(updateListingRequestSchema.parse({ id: '1', action: UpdateListingAction.CANCEL })).toStrictEqual({
      id: '1',
      action: UpdateListingAction.CANCEL
    })
    expect(updateListingRequestSchema.parse({ id: 'TeStId1234', action: UpdateListingAction.CANCEL })).toStrictEqual({
      id: 'TeStId1234',
      action: UpdateListingAction.CANCEL
    })
  })
})
