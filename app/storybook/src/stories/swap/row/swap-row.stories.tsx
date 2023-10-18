import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { SwapRow as Component } from '@echo/ui/components/swap/row/swap-row'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Swap/Row',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  }
}
