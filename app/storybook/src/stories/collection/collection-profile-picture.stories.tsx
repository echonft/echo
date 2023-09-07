import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionProfilePicture as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const { name, profilePictureUrl } = getCollectionById('Rc8pLQXxgyQGIRL0fr13')

export const Standard: Story = {
  args: {
    collectionName: name,
    pictureUrl: profilePictureUrl
  }
}

export const DefaultPicture: Story = {
  args: {
    collectionName: name,
    pictureUrl: undefined
  }
}
