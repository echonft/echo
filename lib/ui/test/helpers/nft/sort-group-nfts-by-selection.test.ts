import type { Nft } from '@echo/model/types/nft'
import { sortGroupNftsBySelection } from '@echo/ui/helpers/nft/sort/sort-group-nfts-by-selection'
import type { NftGroup } from '@echo/ui/types/nft-group'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft - sortGroupNftsBySelection', () => {
  const groupA: NftGroup = { id: 'a', nfts: [] }
  const groupB: NftGroup = { id: 'b', nfts: [] }
  const groupC: NftGroup = { id: 'c', nfts: [] }
  const unsortedMockGroups: NftGroup[] = [groupC, groupA, groupB]

  const sortedMockGroups: NftGroup[] = [groupA, groupB, groupC]
  it('should return group sorted by id if selection is empty', () => {
    expect(sortGroupNftsBySelection(unsortedMockGroups, [])).toStrictEqual(sortedMockGroups)
  })

  it('should return group sorted by selection (unique) and id if there is a selection', () => {
    const selection: Nft[] = [{ collection: { slug: 'b' } } as Nft]
    expect(sortGroupNftsBySelection(unsortedMockGroups, selection)).toStrictEqual([groupB, groupA, groupC])
  })

  it('should return group sorted by selection (multiple duplicates) and id if there is a selection', () => {
    const selection: Nft[] = [{ collection: { slug: 'b' } } as Nft, { collection: { slug: 'b' } } as Nft]
    expect(sortGroupNftsBySelection(unsortedMockGroups, selection)).toStrictEqual([groupB, groupA, groupC])
  })

  it('should return group sorted by selection (multiple uniques) and id if there is a selection', () => {
    const selection: Nft[] = [{ collection: { slug: 'b' } } as Nft, { collection: { slug: 'c' } } as Nft]
    expect(sortGroupNftsBySelection(unsortedMockGroups, selection)).toStrictEqual([groupB, groupC, groupA])
  })
})
