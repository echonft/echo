import { SwapIconSvg } from '../base/svg/swap-icon-svg'
import { OfferItemsContainer } from './offer-items-container'
import { OfferStatePill } from './offer-state-pill'
import { DirectionLeft, Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  offer: Offer
}

export const OfferCollectionRow: FunctionComponent<Props> = ({ offer }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
      <OfferStatePill state={offer.state} />
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <OfferItemsContainer items={offer.senderItems} discordUsername={offer.sender.discordUsername} />
        <div className={clsx('flex', 'flex-row', 'grow', 'self-stretch', 'items-center', 'justify-center', 'px-4')}>
          <SwapIconSvg direction={DirectionLeft} />
        </div>
        <OfferItemsContainer items={offer.receiverItems} discordUsername={offer.receiver.discordUsername} />
      </div>
    </div>
  )
}
