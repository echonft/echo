import type { Listing } from '@echo/model/types/listing'
import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { TradeDetailsBottomBarLayout } from '@echo/ui/components/trade/layout/trade-details-bottom-bar-layout'
import { TradeDetailsBottomBarNftItem } from '@echo/ui/components/trade/trade-details-bottom-bar-nft-item'
import { TradeDetailsBottomBarTarget } from '@echo/ui/components/trade/trade-details-bottom-bar-target'
import { Direction } from '@echo/ui/constants/direction'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listing: ListingWithRole
  loading?: boolean
  onBack?: EmptyFunction
  onCancel?: (listing: Listing) => void
  onFill?: VoidFunction
}

export const ListingDetailsBottomBar: FunctionComponent<Props> = ({ listing, loading, onBack, onCancel, onFill }) => {
  const t = useTranslations('trade.create')
  return (
    <TradeDetailsBottomBarLayout>
      <div className={clsx('flex', 'flex-row', 'h-max', 'grow', 'basis-0', 'px-8')}>
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
      </div>
      <div className={clsx('flex', 'flex-row', 'h-max', 'w-max', 'flex-none', 'basis-0', 'items-center', 'gap-8')}>
        <TradeDetailsBottomBarNftItem item={head(listing.items)} />
        <span className={clsx('text-yellow-500')}>
          <EchoIconSvg width={32} />
        </span>
        <TradeDetailsBottomBarTarget target={listing.target} />
      </div>
      <div className={clsx('flex', 'flex-row', 'h-max', 'grow', 'basis-0', 'justify-end', 'px-8')}>
        <ListingDetailsButtons listing={listing} isMutating={loading} onCancel={onCancel} onFill={onFill} />
      </div>
    </TradeDetailsBottomBarLayout>
  )
}
