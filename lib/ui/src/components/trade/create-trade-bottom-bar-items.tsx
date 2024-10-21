import type { Collection } from '@echo/model/types/collection/collection'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { NftTradeCard } from '@echo/ui/components/trade/card/nft-trade-card'
import { CreateTradeBottomBarItemsLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-items-layout'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import clsx from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  items: OwnedNft[]
  targetCollection?: Collection
  targetQuantity?: number
  counterpartyItems?: OwnedNft[]
}

export const CreateTradeBottomBarItems: FunctionComponent<Props> = ({ items, counterpartyItems }) => {
  return (
    <CreateTradeBottomBarItemsLayout>
      <NftTradeCard items={items} direction={SwapDirection.Out} />
      <EchoIconSvg className={clsx('text-yellow-500')} height={30} />
      <NftTradeCard items={counterpartyItems ?? []} direction={SwapDirection.In} />
    </CreateTradeBottomBarItemsLayout>
  )
}
