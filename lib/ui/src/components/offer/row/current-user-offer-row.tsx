import { SwapIconSvg } from '@echo/ui/components/base/svg/swap-icon-svg'
import { CurrentUserOfferRowHeader } from '@echo/ui/components/offer/row/current-user-offer-row-header'
import { OfferItemsContainer } from '@echo/ui/components/offer/row/offer-items-container'
import { DirectionLeft } from '@echo/ui/constants/direction'
import { OfferRoleReceiver } from '@echo/ui/constants/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
}

export const CurrentUserOfferRow: FunctionComponent<Props> = ({ offer }) => {
  const { state, receiver, receiverItems, sender, senderItems, role, expired } = offer
  const isReceiver = role === OfferRoleReceiver
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
      <CurrentUserOfferRowHeader
        expired={expired}
        state={state}
        discordUsername={isReceiver ? receiver.discordUsername : sender.discordUsername}
      />
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <OfferItemsContainer items={isReceiver ? receiverItems : senderItems} />
        <div className={clsx('flex', 'flex-row', 'grow', 'self-stretch', 'items-center', 'justify-center', 'px-4')}>
          <SwapIconSvg direction={DirectionLeft} />
        </div>
        <OfferItemsContainer
          items={isReceiver ? senderItems : receiverItems}
          discordUsername={isReceiver ? sender.discordUsername : receiver.discordUsername}
        />
      </div>
    </div>
  )
}
