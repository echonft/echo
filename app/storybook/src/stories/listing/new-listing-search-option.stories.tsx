import { getCollectionById } from '../../mocks/model/nft-collection'
import { NewListingSearchCollectionOption as Component } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Search Collection Option',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')

export const Default: Story = {
  args: {
    pictureUrl: collection.profilePictureUrl,
    collectionName: collection.name,
    collectionSupply: collection.totalSupply
  }
}

export const NoSupply: Story = {
  args: {
    pictureUrl: collection.profilePictureUrl,
    collectionName: collection.name
  }
}
