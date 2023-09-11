import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionSearchCollectionOption as Component } from '@echo/ui/src/components/collection/search/collection-search-collection-option'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Search Collection Option',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const { profilePictureUrl, name, totalSupply } = getCollectionById('Rc8pLQXxgyQGIRL0fr13')

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
