import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionProfilePicture as Component, CollectionProfilePictureSkeleton } from '@echo/ui'
import { SizeLG } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  args: {
    collectionName: 'Sun Flyers',
    pictureUrl: getCollectionById('Rc8pLQXxgyQGIRL0fr13')!.profilePictureUrl,
    size: SizeLG
  }
}

export const Default: Story = {
  args: {
    collectionName: 'Sun Flyers',
    pictureUrl: undefined,
    size: SizeLG
  }
}

export const Skeleton: Story = {
  render: () => <CollectionProfilePictureSkeleton />
}
