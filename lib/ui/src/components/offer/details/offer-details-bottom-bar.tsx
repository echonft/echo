import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import type { NftItem } from '@echo/model/types/item'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import {
  OfferDetailsButtons,
  type OfferDetailsButtonsProps
} from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { TradeDetailsBottomBarCenterItemsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-center-items-layout'
import { TradeDetailsBottomBarLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-layout'
import { TradeDetailsBottomBarLeftButtonsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-left-buttons-layout'
import { TradeDetailsBottomBarRightButtonsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-right-buttons-layout'
import { TradeDetailsBottomBarCenterItemsLogo } from '@echo/ui/components/trade/details/trade-details-bottom-bar-center-items-logo'
import { TradeDetailsBottomBarNftItem } from '@echo/ui/components/trade/details/trade-details-bottom-bar-nft-item'
import { Direction } from '@echo/ui/constants/direction'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, type NonEmptyArray, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends OfferDetailsButtonsProps {
  onBack?: EmptyFunction
}

export const OfferDetailsBottomBar: FunctionComponent<Props> = ({
  offer,
  loading,
  onBack,
  onError,
  onLoading,
  onRedeem,
  onSwap,
  onUpdate
}) => {
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
        <TradeDetailsBottomBarNftItem
          item={pipe<[OfferWithRole], NonEmptyArray<NftItem>, NftItem>(offerSenderNftItems, head)(offer)}
        />
        <TradeDetailsBottomBarCenterItemsLogo />
        <TradeDetailsBottomBarNftItem
          item={pipe<[OfferWithRole], NonEmptyArray<NftItem>, NftItem>(offerReceiverNftItems, head)(offer)}
        />
      </TradeDetailsBottomBarCenterItemsLayout>
      <TradeDetailsBottomBarRightButtonsLayout>
        <OfferDetailsButtons
          offer={offer}
          loading={loading}
          onError={onError}
          onLoading={onLoading}
          onRedeem={onRedeem}
          onSwap={onSwap}
          onUpdate={onUpdate}
        />
      </TradeDetailsBottomBarRightButtonsLayout>
    </TradeDetailsBottomBarLayout>
  )
}
