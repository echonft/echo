import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionSearchCollectionOption as Component } from '@echo/ui/components/collection/search/collection-search-collection-option'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Search Collection Option',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const { profilePictureUrl, name, totalSupply } = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')

export const Default: Story = {
  args: {
    pictureUrl: profilePictureUrl,
    collectionName: name,
    collectionSupply: totalSupply
  }
}

export const NoSupply: Story = {
  args: {
    pictureUrl: profilePictureUrl,
    collectionName: name
  }
}
