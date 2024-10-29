import type { Collection } from '@echo/model/types/collection'
import type { OwnedNft } from '@echo/model/types/nft'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { CreateTradeBottomBarItems } from '@echo/ui/components/trade/create-trade-bottom-bar-items'
import { CreateTradeBottomBarButtonLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-button-layout'
import { CreateTradeBottomBarItemsLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-items-layout'
import { CreateTradeBottomBarLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-layout'
import { Direction } from '@echo/ui/constants/direction'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps {
  items: OwnedNft[]
  loading?: boolean
  targetCollection?: Collection
  targetQuantity?: number
  counterpartyItems?: OwnedNft[]
  onBack?: () => void
}

// TODO Not sure if having the next button as children is ideal
export const CreateTradeBottomBar: FunctionComponent<Props> = ({
  loading,
  items,
  targetCollection,
  targetQuantity,
  counterpartyItems,
  onBack,
  children
}) => {
  const t = useTranslations('trade.create')
  return (
    <CreateTradeBottomBarLayout>
      <CreateTradeBottomBarButtonLayout>
        <button
          className={clsx(
            'btn-primary',
            'flex',
            'flex-row',
            'gap-2.5',
            'btn-size-alt',
            'group',
            loading && 'animate-pulse',
            isNil(onBack) && 'invisible'
          )}
          disabled={loading}
          onClick={() => {
            onBack?.()
          }}
        >
          <span className={clsx('btn-label-primary')}>
            <SideCaretSvg direction={Direction.Left} />
          </span>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('backBtn')}</span>
        </button>
      </CreateTradeBottomBarButtonLayout>
      <CreateTradeBottomBarItemsLayout>
        <CreateTradeBottomBarItems
          items={items}
          targetCollection={targetCollection}
          targetQuantity={targetQuantity}
          counterpartyItems={counterpartyItems}
        />
      </CreateTradeBottomBarItemsLayout>
      <CreateTradeBottomBarButtonLayout>{children}</CreateTradeBottomBarButtonLayout>
    </CreateTradeBottomBarLayout>
  )
}
