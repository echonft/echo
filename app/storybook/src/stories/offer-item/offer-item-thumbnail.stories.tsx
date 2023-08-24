import { getOfferById } from '../../mocks/model/offer'
import { NftThumbnailOfferSkeleton, OfferItemThumbnail as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer Items/Thumbnail',
  component: Component,
  argTypes: {
    onRemove: {
      control: false,
      action: 'removable'
    },
    size: {
      options: ['Medium', 'Large'],
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['nft']
    }
  }
}

export default metadata

const item = getOfferById('LyCfl6Eg7JKuD7XJ6IPi').receiverItems[0]!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    item,
    discordUsername: undefined
  }
}

export const NotRemovable: Story = {
  args: {
    item,
    onRemove: undefined
  }
}

export const UserDisplayed: Story = {
  args: {
    item,
    onRemove: undefined,
    discordUsername: 'johnnycage#0890'
  }
}

export const Skeleton: Story = {
  render: ({ size }) => <NftThumbnailOfferSkeleton size={size} />
}
