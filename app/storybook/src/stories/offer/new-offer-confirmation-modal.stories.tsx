import { NewOfferConfirmationModal as Component } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { getOfferById } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New Offer Confirmation Modal',
  component: Component
}

export default metadata

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    newOffer: { receiver: offer.receiver, senderItems: offer.senderItems, receiverItems: offer.receiverItems }
  }
}

export const MultipleAssets: Story = {
  args: {
    newOffer: {
      receiver: offer.receiver,
      senderItems: offer.senderItems.concat(offer.receiverItems),
      receiverItems: offer.receiverItems.concat(offer.senderItems)
    }
  }
}

export const Confirmed: Story = {
  args: {
    offer
  }
}
