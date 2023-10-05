import { CollectionProfilePicture as Component } from '@echo/ui/components/collection/details/collection-profile-picture'
import { SizeLG } from '@echo/ui/constants/size'
import { getCollectionById } from '@mocks/model/collection'
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
    pictureUrl: profilePictureUrl,
    size: SizeLG
  }
}

export const DefaultPicture: Story = {
  args: {
    collectionName: name,
    pictureUrl: undefined,
    size: SizeLG
  }
}
