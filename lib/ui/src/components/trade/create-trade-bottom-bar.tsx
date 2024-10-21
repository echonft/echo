import type { Collection } from '@echo/model/types/collection/collection'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { CreateTradeBottomBarItems } from '@echo/ui/components/trade/create-trade-bottom-bar-items'
import { CreateTradeBottomBarButtonLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-button-layout'
import { CreateTradeBottomBarItemsLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-items-layout'
import { CreateTradeBottomBarLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-layout'
import { Direction } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  loading: boolean
  items: OwnedNft[]
  targetCollection?: Collection
  targetQuantity?: number
  counterpartyItems?: OwnedNft[]
  nextBtnLabel?: string
  cancelBtnLabel?: string
  nextDisabled?: boolean
  cancelDisabled?: boolean
  onBack?: () => void
  onNext?: () => void
  onCancel?: () => void
}

export const CreateTradeBottomBar: FunctionComponent<Props> = ({
  loading,
  items,
  targetCollection,
  targetQuantity,
  counterpartyItems,
  onNext,
  onBack
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
      <CreateTradeBottomBarButtonLayout>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
          disabled={loading}
          onClick={() => {
            onNext?.()
          }}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('nextBtn')}</span>
        </button>
      </CreateTradeBottomBarButtonLayout>
    </CreateTradeBottomBarLayout>
  )
}
