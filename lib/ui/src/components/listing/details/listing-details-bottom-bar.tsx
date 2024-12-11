import type { Listing } from '@echo/model/types/listing'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { TradeDetailsBottomBarCenterItemsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-center-items-layout'
import { TradeDetailsBottomBarLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-layout'
import { TradeDetailsBottomBarLeftButtonsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-left-buttons-layout'
import { TradeDetailsBottomBarRightButtonsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-right-buttons-layout'
import { TradeDetailsBottomBarCenterItemsLogo } from '@echo/ui/components/trade/details/trade-details-bottom-bar-center-items-logo'
import { TradeDetailsBottomBarNftItem } from '@echo/ui/components/trade/details/trade-details-bottom-bar-nft-item'
import { TradeDetailsBottomBarTarget } from '@echo/ui/components/trade/details/trade-details-bottom-bar-target'
import { Direction } from '@echo/ui/constants/direction'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listing: ListingWithRole
  loading?: boolean
  onBack?: VoidFunction
  onCancel?: (listing: Listing) => void
  onFill?: VoidFunction
}

export const ListingDetailsBottomBar: FunctionComponent<Props> = ({ listing, loading, onBack, onCancel, onFill }) => {
  const t = useTranslations('trade.create')
  return (
    <TradeDetailsBottomBarLayout>
      <TradeDetailsBottomBarLeftButtonsLayout>
        <button
          className={clsx('btn-primary', 'group', loading && 'animate-pulse')}
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
      </TradeDetailsBottomBarLeftButtonsLayout>
      <TradeDetailsBottomBarCenterItemsLayout>
        <TradeDetailsBottomBarNftItem item={head(listing.items)} />
        <TradeDetailsBottomBarCenterItemsLogo />
        <TradeDetailsBottomBarTarget target={listing.target} />
      </TradeDetailsBottomBarCenterItemsLayout>
      <TradeDetailsBottomBarRightButtonsLayout>
        <ListingDetailsButtons listing={listing} isMutating={loading} onCancel={onCancel} onFill={onFill} />
      </TradeDetailsBottomBarRightButtonsLayout>
    </TradeDetailsBottomBarLayout>
  )
}
