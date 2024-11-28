import type { Collection } from '@echo/model/types/collection'
import type { OwnedNft } from '@echo/model/types/nft'
import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { NftTradeCard } from '@echo/ui/components/trade/card/nft-trade-card'
import { TargetTradeCard } from '@echo/ui/components/trade/card/target-trade-card'
import { CreateTradeBottomBarItemsLayout } from '@echo/ui/components/trade/create/layout/create-trade-bottom-bar-items-layout'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import clsx from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: OwnedNft[]
  targetCollection?: Collection
  targetQuantity?: number
  counterpartyItems?: OwnedNft[]
}

export const CreateTradeBottomBarItems: FunctionComponent<Props> = ({
  items,
  counterpartyItems,
  targetCollection,
  targetQuantity
}) => {
  const isItems = isNil(targetCollection) && isNil(targetQuantity)
  const isTarget = isNil(counterpartyItems)
  return (
    <CreateTradeBottomBarItemsLayout>
      <NftTradeCard items={items} direction={SwapDirection.Out} />
      <EchoIconSvg className={clsx('text-yellow-500')} height={30} />
      {isTarget && (
        <TargetTradeCard
          targetCollection={targetCollection}
          targetQuantity={targetQuantity}
          direction={SwapDirection.In}
        />
      )}
      {isItems && <NftTradeCard items={counterpartyItems ?? []} direction={SwapDirection.In} />}
      {/* Default case */}
      {!isTarget && !isItems && <NftTradeCard items={[]} direction={SwapDirection.In} />}
    </CreateTradeBottomBarItemsLayout>
  )
}
