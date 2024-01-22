import { guarded_assertNftExists } from '@echo/frontend/lib/helpers/nft/assert/guarded_assert-nft-exists'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'

describe('helpers - nft - assert - guarded_assertNftExists', () => {
  it('throws if collection is undefined', () => {
    expect(() => guarded_assertNftExists(undefined, 'slug', 'tokenId')).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => guarded_assertNftExists(getNftMockById('8hHFadIrrooORfTOLkBg'), 'slug', 'tokenId')).not.toThrow()
  })
})
