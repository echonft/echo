import { CollectionOfferButton as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Offer Button',
  component: Component,
  argTypes: {
    onMakeOffer: {
      control: false,
      action: 'clicked'
    }
  },
  parameters: {
    controls: {
      exclude: 'disabled'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Active: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Component count={1} />
    </div>
  )
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Component count={0} />
    </div>
  )
}
