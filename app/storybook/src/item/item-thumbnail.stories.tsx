import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { ItemThumbnail as Component } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Items/Thumbnail',
  component: Component,
  argTypes: {
    onRemove: {
      control: false,
      action: 'removed'
    }
  },
  parameters: {
    controls: {
      exclude: ['item', 'onRemove']
    }
  }
}

export default metadata

const item = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi').receiverItems[0]!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    item,
    onRemove: () => {
      return
    }
  }
}

export const NotRemovable: Story = {
  args: {
    item,
    onRemove: undefined
  }
}
