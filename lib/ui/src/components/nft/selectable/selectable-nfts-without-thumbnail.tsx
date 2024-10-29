'use client'
import type { OwnedNft } from '@echo/model/types/nft'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { SelectableNftsLayout } from '@echo/ui/components/nft/selectable/layout/selectable-nfts-layout'
import { clsx } from 'clsx'
import { includes, isEmpty, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<SelectableNftCardProps, 'action' | 'options' | 'onAction'> {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const SelectableNftsWithoutThumbnail: FunctionComponent<Props> = ({
  nfts,
  selection,
  action,
  options,
  onAction,
  onSelect,
  onUnselect
}) => {
  const isSelected = (nft: OwnedNft) => includes(nft, selection)
  return (
    <div className={clsx('flex', 'flex-col', 'gap-8', 'grow')}>
      <SelectableNftsLayout>
        {map(
          (nft) => (
            <SelectableNftCard
              className={clsx(isSelected(nft) && 'border-yellow-500')}
              key={`${nft.collection.contract.address}:${nft.tokenId}`}
              nft={nft}
              selected={isSelected(nft)}
              action={isEmpty(selection) ? action : undefined}
              options={options}
              onSelect={onSelect}
              onUnselect={onUnselect}
              onAction={onAction}
            />
          ),
          nfts
        )}
      </SelectableNftsLayout>
    </div>
  )
}
