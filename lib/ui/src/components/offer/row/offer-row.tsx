import { SwapIconSvg } from '@echo/ui/components/base/svg/swap-icon-svg'
import { OfferItemsContainer } from '@echo/ui/components/offer/row/offer-items-container'
import { OfferStatePill } from '@echo/ui/components/offer/row/offer-state-pill'
import { DirectionLeft } from '@echo/ui/constants/direction'
import type { Offer } from '@echo/ui/types/model/offer'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  offer: Offer
}

export const OfferRow: FunctionComponent<Props> = ({ offer }) => {
  const { state, sender, senderItems, receiverItems, receiver } = offer
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
      <OfferStatePill state={state} />
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <OfferItemsContainer items={senderItems} discordUsername={sender.discordUsername} />
        <div className={clsx('flex', 'flex-row', 'grow', 'self-stretch', 'items-center', 'justify-center', 'px-4')}>
          <SwapIconSvg direction={DirectionLeft} />
        </div>
        <OfferItemsContainer items={receiverItems} discordUsername={receiver.discordUsername} />
      </div>
    </div>
  )
}
