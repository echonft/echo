'use client'
import type { Nft } from '@echo/model/types/nft'
import { SelectableNftGroupsLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-groups-layout'
import { SelectableNftGroup } from '@echo/ui/components/nft/group/selectable-nft-group'
import { type SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import {
  SelectableNftThumbnailContainer,
  type SelectableNftThumbnailContainerProps
} from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnail-container'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { enableAction } from '@echo/ui/helpers/nft/enable-action'
import type { NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { always, ifElse, isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

export interface SelectableNftGroupsProps extends Pick<SelectableNftCardProps, 'options' | 'onAction'> {
  nfts: Nft[]
  groupBy: (nfts: Nft[]) => NftGroup[]
  selection: SelectableNft[]
  style?: {
    collapsible?: boolean
    selectionContainer?: SelectableNftThumbnailContainerProps['style']
  }
  onSelect?: (nft: SelectableNft) => unknown
  onUnselect?: (nft: SelectableNft) => unknown
}

export const SelectableNftGroups: FunctionComponent<SelectableNftGroupsProps> = ({
  nfts,
  groupBy,
  selection,
  options,
  style,
  onAction,
  onSelect,
  onUnselect
}) => {
  const [groups, setGroups] = useState<NftGroup[]>([])

  // update groups when selection changes
  useEffect(() => {
    pipe(ifElse(always(isEmpty(selection)), map(enableAction), map(disableAction)), groupBy, setGroups)(nfts)
  }, [nfts, groupBy, selection])

  return (
    <div className={clsx('flex', 'flex-col', 'gap-8')}>
      <SelectableNftThumbnailContainer nfts={selection} onRemove={onUnselect} style={style?.selectionContainer} />
      <SelectableNftGroupsLayout style={style}>
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
