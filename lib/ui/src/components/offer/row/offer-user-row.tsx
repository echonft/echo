import { DirectionLeft } from '../../../constants/direction'
import { OfferRoleReceiver } from '../../../constants/offer-role'
import { OfferRole } from '../../../types/offer-role'
import { SwapIconSvg } from '../../base/svg/swap-icon-svg'
import { OfferInfoContainer } from './offer-info-container'
import { OfferItemsContainer } from './offer-items-container'
import { Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  offer: Offer
  role: OfferRole
}

export const OfferUserRow: FunctionComponent<Props> = ({ offer, role }) => {
  const isReceiver = role === OfferRoleReceiver
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
      <OfferInfoContainer
        state={offer.state}
        discordUsername={isReceiver ? offer.receiver.discordUsername : offer.sender.discordUsername}
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
