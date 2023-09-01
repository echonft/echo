import { updateListingRequestSchema } from '../../src/lib/server/validators/update-listing-request-schema'
import { UpdateListingAction } from '@echo/api-public'

describe('validators - updateListingRequestSchema', () => {
  it('wrong action fails validation', () => {
    expect(() => updateListingRequestSchema.parse({ action: undefined })).toThrow()
    expect(() => updateListingRequestSchema.parse({ action: 'UpdateListingAction.CANCEL' })).toThrow()
    expect(() => updateListingRequestSchema.parse({ action: 10 })).toThrow()
  })
  it('valid data pass', () => {
    expect(updateListingRequestSchema.parse({ action: UpdateListingAction.CANCEL })).toStrictEqual({
      action: UpdateListingAction.CANCEL
    })
  })
})
