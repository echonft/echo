import { assertNftExists } from '@echo/frontend/lib/helpers/nft/assert/assert-nft-exists'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'

describe('helpers - nft - assert - assertNftExists', () => {
  it('throws if collection is undefined', () => {
    expect(() => assertNftExists(undefined, 'slug', 'tokenId')).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => assertNftExists(getNftMockById('8hHFadIrrooORfTOLkBg'), 'slug', 'tokenId')).not.toThrow()
  })
})
