import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { CreateTradeBottomBarButtonLayout } from '@echo/ui/components/trade/create/layout/create-trade-bottom-bar-button-layout'
import { Direction } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  loading?: boolean
  onBack?: VoidFunction
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
            'group',
            loading && 'animate-pulse',
            isNil(onBack) && 'invisible'
          )}
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
      <div className={clsx('flex', 'justify-end')}>
        <CreateTradeBottomBarButtonLayout>{children}</CreateTradeBottomBarButtonLayout>
      </div>
    </div>
  )
}
