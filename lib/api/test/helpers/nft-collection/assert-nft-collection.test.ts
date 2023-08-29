import { assertNftCollection } from '../../../src/helpers/nft-collection/assert-nft-collection'
import { NftCollection } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft-collection - assertNftCollection', () => {
  it('throws if collection is undefined', () => {
    expect(() => assertNftCollection(undefined)).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => assertNftCollection({ id: 'collectionId' } as NftCollection)).not.toThrow()
  })
})
