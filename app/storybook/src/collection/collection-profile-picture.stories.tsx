// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionProfilePicture as Component } from '@echo/ui/components/collection/details/collection-profile-picture'
import { SIZE_LG } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const { name, profilePictureUrl } = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')

export const Standard: Story = {
  args: {
    collectionName: name,
    pictureUrl: profilePictureUrl,
    size: SIZE_LG
  }
}

export const DefaultPicture: Story = {
  args: {
    collectionName: name,
    pictureUrl: undefined,
    size: SIZE_LG
  }
}
