import { nftCollections } from '@echo/model'
import { CollectionProfile as Component, CollectionProfileSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Collection Profile',
  component: Component
}

export default metadata

const mockNftCollection = nftCollections['Rc8pLQXxgyQGIRL0fr13']!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <Component
      collectionName={mockNftCollection.name}
      size={10000}
      pictureUrl={mockNftCollection.profilePictureUrl}
      discordUrl={mockNftCollection.discordUrl}
      twitterUsername={mockNftCollection.twitterUsername}
      websiteUrl={mockNftCollection.websiteUrl}
    />
  )
}

export const Skeleton: Story = {
  render: () => <CollectionProfileSkeleton />
}
