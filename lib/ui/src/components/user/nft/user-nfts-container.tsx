'use client'
import { NftsByCollectionDisclosureManager } from './nfts-by-collection-disclosure-manager'
import { Nft, NftsByCollectionSelection } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import { eqPaths } from '@echo/utils/src/fp/eq-paths'
import { clsx } from 'clsx'
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
    <div className={clsx('flex', 'flex-col', 'grow', 'gap-12', 'h-max')}>
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
    </div>
  )
}
