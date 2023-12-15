import { NftCardTitleCollectionName } from '@echo/ui/components/nft/card/nft-card-title-collection-name'
import { NftCardTitleTokenId } from '@echo/ui/components/nft/card/nft-card-title-token-id'
import { SelectableNftCardTitleLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-title-layout'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
}

export const SelectableNftCardTitle: FunctionComponent<Props> = ({ nft }) => {
  const { disabled, action, actionDisabled } = nft
  return (
    <SelectableNftCardTitleLayout>
      <div
        className={clsx(
          'translate-y-3.75',
          'transition-transform ease-in-out',
          !disabled && !actionDisabled && !isNil(action) && 'group-hover:translate-y-0'
        )}
      >
        <NftCardTitleCollectionName nft={nft} />
        <NftCardTitleTokenId nft={nft} />
      </div>
    </SelectableNftCardTitleLayout>
  )
}
