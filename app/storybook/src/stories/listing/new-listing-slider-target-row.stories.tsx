import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { NewListingSliderTargetRow as Component } from '@echo/ui/components/listing/new/new-listing-slider-target-row'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Target Row',
  component: Component,
  argTypes: {
    onQuantityChange: {
      control: false,
      action: 'quantity changed'
    },
    onRemove: {
      control: false,
      action: 'removed'
    }
  },
  parameters: {
    controls: {
      exclude: ['bannerUrl', 'pictureUrl', 'onQuantityChange', 'onRemove']
    }
  }
}

export default metadata
const collection = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')

type Story = StoryObj<typeof Component>

export const Editable: Story = {
  args: {
    collectionName: collection.name,
    bannerUrl: collection.bannerUrl,
    pictureUrl: collection.profilePictureUrl,
    quantity: 1,
    onRemove: () => {
      return
    }
  },
  render: (args) => {
    const [quantity, setQuantity] = useState<number>(args.quantity)
    return <Component {...args} quantity={quantity} onQuantityChange={setQuantity} />
  }
}

export const ReadOnly: Story = {
  args: {
    collectionName: collection.name,
    bannerUrl: collection.bannerUrl,
    pictureUrl: collection.profilePictureUrl,
    quantity: 1
  }
}
