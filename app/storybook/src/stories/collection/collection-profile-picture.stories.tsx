import { CollectionProfilePicture as Component, CollectionProfilePictureSkeleton, nftCollections } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => (
    <Component collectionName={'Sun Flyers'} pictureUrl={nftCollections['Rc8pLQXxgyQGIRL0fr13']!.profilePictureUrl} />
  )
}

export const Default: Story = {
  render: () => <Component collectionName={'Sun Flyers'} pictureUrl={undefined} />
}

export const Skeleton: Story = {
  render: () => <CollectionProfilePictureSkeleton />
}
