'use client'
import type { Nft } from '@echo/model/types/nft'
import { withIdEquals } from '@echo/ui/comparators/with-id-equals'
import { SelectableNftGroupsLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-groups-layout'
import { SelectableNftGroup } from '@echo/ui/components/nft/group/selectable-nft-group'
import { type SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { SelectableNftThumbnailContainer } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnail-container'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { enableAction } from '@echo/ui/helpers/nft/enable-action'
import type { NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { includesWith } from '@echo/utils/fp/includes-with'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { clsx } from 'clsx'
import { append, filter, flatten, isEmpty, map, modify, pipe, prop, reject } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

export interface SelectableNftGroupsProps extends Pick<SelectableNftCardProps, 'options' | 'onAction'> {
  nfts: Nft[]
  groupBy: (nfts: Nft[]) => NftGroup[]
  initialSelection?: Nft[]
  style?: {
    collapsible?: boolean
  }
  onSelectionUpdate?: (selection: SelectableNft[]) => unknown
}

export const SelectableNftGroups: FunctionComponent<SelectableNftGroupsProps> = ({
  nfts,
  groupBy,
  initialSelection,
  options,
  style,
  onAction,
  onSelectionUpdate
}) => {
  const [selection, setSelection] = useState<SelectableNft[]>(initialSelection ?? [])
  const [groups, setGroups] = useState<NftGroup[]>([])
  const onSelect = (nft: Nft) => {
    setSelection(append(nft))
    setGroups(
      pipe(
        filter(pipe(prop('nfts'), includesWith(nft, withIdEquals))),
        map(
          modify<'nfts', SelectableNft[], SelectableNft[]>('nfts', pipe(reject(withIdEquals(nft)), map(disableAction)))
        )
      )
    )
  }
  const onUnselect = (nft: Nft) => {
    setSelection(reject(withIdEquals(nft)))
    setGroups(pipe(map(prop('nfts')), flatten, append(nft), groupBy))
  }

  // set the initial groups + update the groups when the underlying NFTs change
  useEffect(() => {
    pipe(groupBy, setGroups)(nfts)
    setSelection(filter(isInWith(nfts, withIdEquals)))
  }, [nfts, groupBy])

  // trigger a selection update when it changes + enable action if selection is empty
  useEffect(() => {
    if (isEmpty(selection)) {
      setGroups(map(modify('nfts', map(enableAction))))
    }
    onSelectionUpdate?.(selection)
  }, [onSelectionUpdate, selection])

  return (
    <div className={clsx('flex', 'flex-col', 'w-full', 'grow', 'gap-8')}>
      <SelectableNftThumbnailContainer nfts={selection} onRemove={onUnselect} />
      <SelectableNftGroupsLayout>
        {map(
          (group) => (
            <SelectableNftGroup
              key={group.id}
              group={group}
              options={options}
              style={style}
              onSelect={onSelect}
              onAction={onAction}
            />
          ),
          groups
        )}
      </SelectableNftGroupsLayout>
    </div>
  )
}
