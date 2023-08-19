import { DirectionLeft } from '../../types/direction'
import { Offer as OfferModel } from '../../types/offer'
import { SwapIconSvg } from '../base/svg/swap-icon-svg'
import { OfferAssetsContainer } from './offer-assets-container'
import { OfferInfoContainer } from './offer-info-container'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferProps {
  offer: OfferModel
  isReceiver: boolean
}

export const Offer: FunctionComponent<OfferProps> = ({ offer, isReceiver }) => {
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
        <OfferAssetsContainer items={isReceiver ? offer.receiverItems : offer.senderItems} />
        <SwapIconSvg direction={DirectionLeft} />
        <OfferAssetsContainer
          items={isReceiver ? offer.senderItems : offer.receiverItems}
          discordUsername={isReceiver ? offer.sender.discordUsername : offer.receiver.discordUsername}
        />
      </div>
    </div>
  )
}
