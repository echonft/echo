'use client'
import type { Collection } from '@echo/model/types/collection'
import type { OwnedNft } from '@echo/model/types/nft'
import type { UserWithWallet } from '@echo/model/types/user'
import { CollectionSelector } from '@echo/ui/components/trade/collection-selector/collection-selector'
import { CreateTradeUserNftsSelection } from '@echo/ui/components/trade/create-trade-user-nfts-selection'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import type { Nullable } from '@echo/utils/types/nullable'
import clsx from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: UserWithWallet
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
  target: Nullable<Collection>
  onAddQuantity?: (quantity: number) => unknown
  onSelectTarget?: (collection: Collection) => unknown
}

export const CreateListingFirstStep: FunctionComponent<Props> = ({
  user,
  nfts,
  selection,
  onSelect,
  onUnselect,
  target,
  onAddQuantity,
  onSelectTarget
}) => {
  return (
    <TradeDetailsInfoLayout>
      <div className={clsx('flex', 'flex-col', 'grow', 'basis-0', 'items-start', 'gap-12')}>
        <CreateTradeUserNftsSelection
          user={user}
          nfts={nfts}
          selection={selection}
          onSelect={onSelect}
          onUnselect={onUnselect}
        />
      </div>
      <div className={clsx('flex', 'flex-col', 'items-end', 'gap-14')}>
        <div className={clsx('h-40')} />
        <CollectionSelector collection={target} onAddQuantity={onAddQuantity} onSelect={onSelectTarget} />
      </div>
    </TradeDetailsInfoLayout>
  )
}
