import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { TradeCardLayout } from '@echo/ui/components/trade/card/layout/trade-card-layout'
import { TradeCardStackLayout } from '@echo/ui/components/trade/card/layout/trade-card-stack-layout'
import { TradeCardPicture } from '@echo/ui/components/trade/card/trade-card-picture'
import { head, type NonEmptyArray } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: NonEmptyArray<Erc721Item | Erc1155Item>
}

export const TradeCard: FunctionComponent<Props> = ({ items }) => {
  const item = head(items)
  if (items.length > 1) {
    return (
      <TradeCardStackLayout>
        <TradeCardPicture item={item} />
      </TradeCardStackLayout>
    )
  }
  return (
    <TradeCardLayout>
      <TradeCardPicture item={item} />
    </TradeCardLayout>
  )
}
