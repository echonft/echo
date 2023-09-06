import { SwapIconSvg } from '../base/svg/swap-icon-svg'
import { OfferInfoContainer } from './offer-info-container'
import { OfferItemsContainer } from './offer-items-container'
import { DirectionLeft, Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  offer: Offer
  isReceiver: boolean
}

export const OfferRow: FunctionComponent<Props> = ({ offer, isReceiver }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-5', 'rounded-lg', 'bg-white/[0.05]')}>
      <OfferInfoContainer
        state={offer.state}
        discordUsername={isReceiver ? offer.sender.discordUsername : offer.receiver.discordUsername}
      />
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <OfferItemsContainer items={isReceiver ? offer.receiverItems : offer.senderItems} />
        <div className={clsx('flex', 'flex-row', 'grow', 'self-stretch', 'items-center', 'justify-center', 'px-4')}>
          <SwapIconSvg direction={DirectionLeft} />
        </div>
        <OfferItemsContainer
          items={isReceiver ? offer.senderItems : offer.receiverItems}
          discordUsername={isReceiver ? offer.sender.discordUsername : offer.receiver.discordUsername}
        />
      </div>
    </div>
  )
}
