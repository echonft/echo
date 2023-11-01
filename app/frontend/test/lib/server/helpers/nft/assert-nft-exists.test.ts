import { assertNftExists } from '@echo/frontend/lib/server/helpers/nft/assert-nft-exists'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'

describe('helpers - nft - assertCollectionExists', () => {
  it('throws if collection is undefined', () => {
    expect(() => assertNftExists(undefined, 'slug', 'tokenId')).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => assertNftExists(getNftMockById('8hHFadIrrooORfTOLkBg'), 'slug', 'tokenId')).not.toThrow()
  })
})
