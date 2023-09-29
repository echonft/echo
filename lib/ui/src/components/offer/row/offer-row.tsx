import { OfferItemsContainer } from '@echo/ui/components/offer/layout/offer-items-container'
import { OfferRowSwapContainerLayout } from '@echo/ui/components/offer/layout/offer-row-swap-container-layout'
import { OfferRowLayout } from '@echo/ui/components/offer/row/layout/offer-row-layout'
import { OfferRowHeader } from '@echo/ui/components/offer/row/offer-row-header'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/row/offer-row-swap-icon'
import { OfferRoleReceiver } from '@echo/ui/constants/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
}

export const OfferRow: FunctionComponent<Props> = ({ offer }) => {
  const { state, receiver, receiverItems, sender, senderItems, role, expired } = offer
  const isReceiver = role === OfferRoleReceiver
  return (
    <OfferRowLayout>
      <OfferRowHeader
        expired={expired}
        state={state}
        discordUsername={isReceiver ? receiver.discord.username : sender.discord.username}
      />
      <OfferRowSwapContainerLayout>
        <OfferItemsContainer items={isReceiver ? receiverItems : senderItems} />
        <OfferRowSwapIcon />
        <OfferItemsContainer
          items={isReceiver ? senderItems : receiverItems}
          discordUsername={isReceiver ? sender.discord.username : receiver.discord.username}
        />
      </OfferRowSwapContainerLayout>
    </OfferRowLayout>
  )
}
