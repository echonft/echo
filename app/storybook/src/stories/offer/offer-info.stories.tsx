import { OfferInfoContainer as Component, OfferState } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Info',
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
    state: OfferState.OPEN,
    discordUsername: 'johnnycage#0890'
  },
  render: ({ state, discordUsername }) => <Component state={state} discordUsername={discordUsername}></Component>
}
