import { SwapIconSvg } from '../base/svg/swap-icon-svg'
import { OfferInfoContainer } from './offer-info-container'
import { OfferItemsContainer } from './offer-items-container'
import { DirectionLeft, Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferProps {
  offer: Offer
  isReceiver: boolean
}

export const OfferRow: FunctionComponent<OfferProps> = ({ offer, isReceiver }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'min-w-max',
        'gap-2',
        'px-4',
        'pb-4',
        'pt-3',
        'rounded-lg',
        'bg-white/[0.05]'
      )}
    >
      <OfferInfoContainer
        state={offer.state}
        discordUsername={isReceiver ? offer.sender.discordUsername : offer.receiver.discordUsername}
      />
      <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-2')}>
        <OfferItemsContainer items={isReceiver ? offer.receiverItems : offer.senderItems} />
        <SwapIconSvg direction={DirectionLeft} />
        <OfferItemsContainer
          items={isReceiver ? offer.senderItems : offer.receiverItems}
          discordUsername={isReceiver ? offer.sender.discordUsername : offer.receiver.discordUsername}
        />
      </div>
    </div>
  )
}
