import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { assertNftCollection } from '@server/helpers/nft-collection/assert-nft-collection'

describe('helpers - nft-collection - assertNftCollection', () => {
  it('throws if collection is undefined', () => {
    expect(() => assertNftCollection(undefined)).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => assertNftCollection({ id: 'collectionId' } as FirestoreNftCollection)).not.toThrow()
  })
})
