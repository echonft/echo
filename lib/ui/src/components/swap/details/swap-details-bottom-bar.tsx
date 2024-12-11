import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import type { NftItem } from '@echo/model/types/item'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { TradeDetailsBottomBarCenterItemsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-center-items-layout'
import { TradeDetailsBottomBarLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-layout'
import { TradeDetailsBottomBarLeftButtonsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-left-buttons-layout'
import { TradeDetailsBottomBarRightButtonsLayout } from '@echo/ui/components/trade/details/layout/trade-details-bottom-bar-right-buttons-layout'
import { TradeDetailsBottomBarCenterItemsLogo } from '@echo/ui/components/trade/details/trade-details-bottom-bar-center-items-logo'
import { TradeDetailsBottomBarNftItem } from '@echo/ui/components/trade/details/trade-details-bottom-bar-nft-item'
import { Direction } from '@echo/ui/constants/direction'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, type NonEmptyArray, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  swap: SwapWithRole
  onBack?: VoidFunction
}

export const SwapDetailsBottomBar: FunctionComponent<Props> = ({ swap, onBack }) => {
  const t = useTranslations('trade.create')
  return (
    <TradeDetailsBottomBarLayout>
      <TradeDetailsBottomBarLeftButtonsLayout>
        <button
          className={clsx('btn-primary', 'group')}
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
          item={pipe<[SwapWithRole], NonEmptyArray<NftItem>, NftItem>(swapSenderNftItems, head)(swap)}
        />
        <TradeDetailsBottomBarCenterItemsLogo />
        <TradeDetailsBottomBarNftItem
          item={pipe<[SwapWithRole], NonEmptyArray<NftItem>, NftItem>(swapReceiverNftItems, head)(swap)}
        />
      </TradeDetailsBottomBarCenterItemsLayout>
      <TradeDetailsBottomBarRightButtonsLayout />
    </TradeDetailsBottomBarLayout>
  )
}
