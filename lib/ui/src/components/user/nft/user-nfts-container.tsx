'use client'
import { NftsByCollectionSelection } from '../../../types/nfts-by-collection-selection'
import { NftsByCollectionDisclosureManager } from '../../nft/layout/group/by-collection/nfts-by-collection-disclosure-manager'
import { NftGroupsContainer } from '../../nft/layout/group/nft-groups-container'
import { Nft } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import { eqPaths } from '@echo/utils/src/fp/eq-paths'
import { find, groupWith, head, isNil, map, pathEq } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  nfts: NonEmptyArray<Nft>
  initialSelection?: NftsByCollectionSelection[]
  onSelectionUpdate?: (collectionId: string, selection: string[]) => unknown
}

function getSelectionForCollection(collectionId: string, selection: NftsByCollectionSelection[] | undefined) {
  if (isNil(selection)) {
    return undefined
  }
  return find(pathEq(collectionId, ['collection', 'id']), selection) as string[] | undefined
}

export const UserNftsContainer: FunctionComponent<Props> = ({ nfts, initialSelection, onSelectionUpdate }) => {
  const groupedNfts = useMemo(() => groupWith(eqPaths(['collection', 'id']), nfts), [nfts]) as NonEmptyArray<
    NonEmptyArray<Nft>
  >
  return (
    <NftGroupsContainer>
      {map((nftGroup: NonEmptyArray<Nft>) => {
        const collectionId = head(nftGroup).collection.id
        const groupInitialSelection = getSelectionForCollection(collectionId, initialSelection)
        return (
          <NftsByCollectionDisclosureManager
            key={collectionId}
            nfts={nftGroup}
            initialSelection={groupInitialSelection}
            onSelectionUpdate={(selection: string[]) => {
              onSelectionUpdate?.(collectionId, selection)
            }}
          />
        )
      }, groupedNfts)}
    </NftGroupsContainer>
  )
}
