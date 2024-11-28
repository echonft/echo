import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/nft'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { CreateTradeBottomBarItems } from '@echo/ui/components/trade/create-trade-bottom-bar-items'
import { CreateTradeBottomBarButtonLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-button-layout'
import { CreateTradeBottomBarItemsLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-items-layout'
import { CreateTradeBottomBarLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-layout'
import { Direction } from '@echo/ui/constants/direction'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  items: OwnedNft[]
  loading?: boolean
  targetCollection?: Nullable<Listing['target']>
  counterpartyItems?: OwnedNft[]
  onBack?: EmptyFunction
}

// TODO Not sure if having the next button as children is ideal
export const CreateTradeBottomBar: FunctionComponent<PropsWithChildren<Props>> = ({
  loading,
  items,
  targetCollection,
  counterpartyItems,
  onBack,
  children
}) => {
  const t = useTranslations('trade.create')
  return (
    <CreateTradeBottomBarLayout>
      <CreateTradeBottomBarButtonLayout>
        <button
          className={clsx('btn-primary', 'group', loading && 'animate-pulse', isNil(onBack) && 'invisible')}
          disabled={loading}
          onClick={() => {
            onBack?.()
          }}
        >
          <div className={clsx('btn-label-with-icon-layout', 'btn-label-primary')}>
            <SideCaretSvg direction={Direction.Left} />
            <span>{t('backBtn')}</span>
          </div>
        </button>
      </CreateTradeBottomBarButtonLayout>
      <CreateTradeBottomBarItemsLayout>
        <CreateTradeBottomBarItems
          items={items}
          targetCollection={targetCollection?.collection}
          targetQuantity={targetCollection?.quantity}
          counterpartyItems={counterpartyItems}
        />
      </CreateTradeBottomBarItemsLayout>
      <CreateTradeBottomBarButtonLayout>{children}</CreateTradeBottomBarButtonLayout>
    </CreateTradeBottomBarLayout>
  )
}
