import { getOfferById } from '../../mocks/model/offer'
import { ItemThumbnail as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Items/Thumbnail',
  component: Component,
  argTypes: {
    onRemove: {
      defaultValue: 'false',
      options: {
        true: true,
        false: undefined
      },
      control: { type: 'radio' },
      action: 'removable'
    },
    size: {
      defaultValue: 'Medium',
      options: ['Medium', 'Large'],
      control: { type: 'radio' }
    },
    discordUsername: {
      defaultValue: undefined,
      control: { type: 'text' }
    }
  },
  parameters: {
    controls: {
      exclude: ['item']
    }
  }
}

export default metadata

const item = getOfferById('LyCfl6Eg7JKuD7XJ6IPi').receiverItems[0]!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    item,
    size: 'Medium',
    discordUsername: undefined
  }
}

export const NotRemovable: Story = {
  args: {
    item,
    size: 'Medium',
    onRemove: undefined
  }
}

export const UserDisplayed: Story = {
  args: {
    item,
    size: 'Medium',
    onRemove: undefined,
    discordUsername: 'johnnycage#0890'
  }
}
