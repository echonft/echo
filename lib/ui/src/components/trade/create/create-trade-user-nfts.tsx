'use client'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { OwnedNft } from '@echo/model/types/nft'
import { SelectableNftCardsLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-cards-layout'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { clsx } from 'clsx'
import { includes, isEmpty, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<SelectableNftCardProps, 'action' | 'options' | 'onAction'> {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const CreateTradeUserNfts: FunctionComponent<Props> = ({
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
      <SelectableNftCardsLayout>
        {map(
          (nft) => (
            <SelectableNftCard
              key={serializeNft(nft)}
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
      </SelectableNftCardsLayout>
    </div>
  )
}
