import { DirectionLeft } from '../../../constants/direction'
import { SwapIconSvg } from '../../base/svg/swap-icon-svg'
import { OfferItemsContainer } from './offer-items-container'
import { OfferStatePill } from './offer-state-pill'
import { Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
