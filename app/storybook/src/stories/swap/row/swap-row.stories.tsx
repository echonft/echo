import { SwapRow as Component } from '@echo/ui/components/swap/row/swap-row'
import { getOfferById } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'

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
    offer: getOfferById('LyCfl6Eg7JKuD7XJ6IPi')
  }
}
