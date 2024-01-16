import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { NewListingModalTargetRow as Component } from '@echo/ui/components/listing/new/new-listing-modal-target-row'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Target Row',
  component: Component,
  argTypes: {
    onQuantityChange: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['bannerUrl', 'pictureUrl', 'isMutating']
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
    quantity: 1
  },
  render: (args) => {
    const [quantity, setQuantity] = useState<number>(args.quantity)
    return (
      <Component
        {...args}
        quantity={quantity}
        onQuantityChange={(quantity: number) => {
          args.onQuantityChange?.(quantity)
          setQuantity(quantity)
        }}
      />
    )
  }
}

export const ReadOnly: Story = {
  args: {
    collectionName: collection.name,
    bannerUrl: collection.bannerUrl,
    pictureUrl: collection.profilePictureUrl,
    quantity: 1,
    onQuantityChange: undefined
  }
}
