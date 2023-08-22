import { OfferState, OfferStatePill as Component, OfferStateSkeleton } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/State',
  component: Component,
  argTypes: {
    state: {
      options: Object.values(OfferState),
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    state: OfferState.OPEN
  }
}

export const Skeleton: Story = {
  render: () => <OfferStateSkeleton />
}
