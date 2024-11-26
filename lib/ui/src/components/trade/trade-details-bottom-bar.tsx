import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { CreateTradeBottomBarButtonLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-button-layout'
import { Direction } from '@echo/ui/constants/direction'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  loading?: boolean
  onBack?: EmptyFunction
}

export const TradeDetailsBottomBar: FunctionComponent<PropsWithChildren<Props>> = ({ loading, onBack, children }) => {
  const t = useTranslations('trade.create')
  return (
    <div className={clsx('grid', 'grid-cols-2', 'w-full', 'h-32', 'py-5', 'items-center')}>
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
      <div className={clsx('flex', 'justify-end')}>
        <CreateTradeBottomBarButtonLayout>{children}</CreateTradeBottomBarButtonLayout>
      </div>
    </div>
  )
}
