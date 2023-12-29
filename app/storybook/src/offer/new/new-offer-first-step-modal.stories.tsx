import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferFirstStepModal as Component } from '@echo/ui/components/offer/new/new-offer-first-step-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/First Step Modal',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onContinue: {
      table: {
        disable: true
      }
    },
    onReset: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['receiverItems', 'receiver', 'open']
    }
  }
}

export default metadata

const { receiverItems, receiver } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    receiver,
    receiverItems,
    open: true
  }
}
