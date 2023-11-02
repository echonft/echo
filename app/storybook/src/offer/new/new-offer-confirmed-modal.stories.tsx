import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferConfirmedModal as Component } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Confirmed Modal',
  component: Component,
  argTypes: {
    onClose: {
      control: false,
      action: 'close'
    }
  },
  parameters: {
    controls: {
      exclude: ['offerId', 'show', 'onClose']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const ConfirmedModal: Story = {
  args: {
    offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'),
    show: true
  }
}
